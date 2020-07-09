Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
		let child = el.querySelector('input')
		if (child) {
			child.focus()
		}
	}
})