var __url = ''
var xhr = {
	get: function(url, data, fn) {
		var obj = new XMLHttpRequest()
		obj.open('GET', __url + url + '?' + this.format(data), true)
		obj.onreadystatechange = function() {
			if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
				fn.call(this, JSON.parse(obj.responseText))
			}
		}
		obj.send(null)
	},
	post: function(url, data, fn) {
		var obj = new XMLHttpRequest()
		obj.open("POST", __url + url, true)
		obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		obj.onreadystatechange = function() {
			if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {
				fn.call(this, JSON.parse(obj.responseText))
			}
		}
		obj.send(this.format(data))
	},
	format: function(data) {
		var arr = []
		for (var i in data) {
			arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]))
		}
		arr.push(("v=" + Math.random()))
		return arr.join("&")
	}
}