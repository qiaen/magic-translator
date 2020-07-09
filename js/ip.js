/* 获取IP */
function getYourIP(func) {
	var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
	if (RTCPeerConnection)(function() {
		var rtc = new RTCPeerConnection({ iceServers: [] });
		if (1 || window.mozRTCPeerConnection) {
			rtc.createDataChannel('', { reliable: false });
		};

		rtc.onicecandidate = function(evt) {
			if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
		};
		rtc.createOffer(function(offerDesc) {
			grepSDP(offerDesc.sdp);
			rtc.setLocalDescription(offerDesc);
		}, function(e) { console.warn("offer failed", e); });


		var addrs = Object.create(null);
		addrs["0.0.0.0"] = false;

		function updateDisplay(newAddr) {
			if (newAddr in addrs) return;
			else addrs[newAddr] = true;
			var displayAddrs = Object.keys(addrs).filter(function(k) { return addrs[k]; });
			for (var i = 0; i < displayAddrs.length; i++) {
				if (displayAddrs[i].length > 16) {
					displayAddrs.splice(i, 1);
					i--;
				}
			}
			/* 获取ip后在这里做回调 */
			func.call(null, displayAddrs[0])
		}

		function grepSDP(sdp) {
			var hosts = [];
			sdp.split('\r\n').forEach(function(line, index, arr) {
				if (~line.indexOf("a=candidate")) {
					var parts = line.split(' '),
						addr = parts[4],
						type = parts[7];
					if (type === 'host') updateDisplay(addr);
				} else if (~line.indexOf("c=")) {
					var parts = line.split(' '),
						addr = parts[2];
					updateDisplay(addr);
				}
			});
		}
	})()
}