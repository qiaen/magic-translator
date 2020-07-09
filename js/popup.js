/* 定义有道翻译接口路径 */
__url = 'http://openapi.youdao.com/api'
/* appKey， 需要在有道申请 */
let appKey = '***'
/* key， 需要在有道申请 */
let key = '***'

/* 官方加密算法 */
function truncate(q) {
	var len = q.length;
	if (len <= 20) return q;
	return q.substring(0, 10) + len + q.substring(len - 10, len);
}
new Vue({
	el: "#main",
	data: {
		/*动画控制*/
		once: false,
		totop: false,
		rotate: false,
		/*关键字*/
		keywords: '',
		/*实例*/
		qrcode: '',
		result: 'loading.....'
	},
	methods: {
		/*搜索关键字*/
		search(e) {
			let salt = new Date().getTime()
			let curTime = Math.round(new Date().getTime() / 1000)
			let str1 = appKey + truncate(this.keywords) + salt + curTime + key
			let sign = sha256(str1)
			let p = {
				q: this.keywords,
				appKey,
				salt: salt,
				from: 'auto',
				to: 'auto',
				sign: sign,
				signType: "v3",
				curtime: curTime
			}
			let ps = ''
			p.keyword = this.keywords
			if (!p.keyword) {
				this.once = this.totop = this.rotate = false
			} else {
				xhr.get(ps, p, r => {
					if (r.errorCode == 0) {
						this.resol(r)
					} else {
						this.result = '查询失败！'
					}
				})
				if (this.totop) {
					this.once = false
					this.$nextTick(() => {
						this.once = true
					})
				} else {
					this.totop = true
				}
			}
		},

		/*获取内网ip匹配是否localhost，127.0.0.1，0.0.0.0并生产二维码*/
		getIp() {
			getYourIP(ip => {
				chrome.tabs.getSelected(e => {
					let url = e.url
					let local = ['http://localhost', 'http://0.0.0.0', 'http://127.0.0.1']
					local.forEach(item => {
						if (url.indexOf(item) > -1) {
							url = url.replace(new RegExp(item), 'http://' + ip)
						}
					})
					this.qrcode.makeCode(url)
				})
			})
		},
		/* 解释接口信息，这里有点绕 */
		resol(val) {
			let lis = ''
			let basic = val.basic
			if (basic) {
				/*音标*/
				if (basic['phonetic']) {
					lis += `<li class="explains flex">
							<label class="shrink0">音标</label>
							<div class="flex1" >
								${basic['uk-phonetic']?`<span class="${basic['uk-speech']?'fcgreen pointer uk-speak':''}">英 <audio preload="auto" volume=1 src="${basic['uk-speech']}"></audio></span> `+basic['uk-phonetic']+'&nbsp;&nbsp;':''}
								${basic['uk-phonetic']?`<span class="${basic['us-speech']?'fcred pointer us-speak':''}">美 <audio preload="auto" volume=1 src="${basic['us-speech']}"></audio></span> `+basic['uk-phonetic']:''}
								${val.l=='zh-CHS2en'?'中 '+basic['phonetic']:''}
							</div>
						</li>`
				}
				/*释义*/
				if (basic.explains) {
					basic.explains.forEach(item => {
						item = item.split('. ')
						lis += `<li class="explains flex">
							<label class="shrink0">${item[1]?(item[0]+'.'):''}</label>
							<div class="flex1">${item[1]?item[1]:item[0]}</div>
						</li>`
					})
				}

			} else {
				lis += `<li class="explains flex">
						<div class="flex1 fsize16">${val.translation.toString()}</div>
					</li>`
			}
			let web = val.web
			if (web) {
				lis += `<li class="explains flex">
						<label class="shrink0">短语</label>
						<div class="flex1">`
				web.forEach(item => {
					lis += `<p>${item.key} ${item.value.toString()}</p>`
				})
				lis += `</div></li>`
			}
			this.result = lis
			this.playit()
		},
		/* 播放功能，暂时不支持，需要购买有道授权 */
		playit() {
			// tts 服务要收费
			window.requestAnimationFrame(() => {
				let us = document.querySelector('.us-speak')
				us && (us.onclick = () => {
					document.querySelector('.us-speak audio').play()
				})
				let uk = document.querySelector('.uk-speak')
				uk && (uk.onclick = () => {
					document.querySelector('.uk-speak audio').play()
				})
			})

		}
	},
	mounted() {
		/*自动翻转*/
		setTimeout(() => {
			this.rotate = true
		}, 4000)
		window.onload = () => {
			/*实例化二维码*/
			this.qrcode = new QRCode(document.getElementById("qrcode"), {
				width: 100,
				height: 100
			})
			/*获取内网ip匹配是否localhost，127.0.0.1，0.0.0.0并生产二维码*/
			this.getIp()
		}
	}
})