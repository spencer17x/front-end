var vm = new Vue({
	el: '#app',
	data: {
		title: 'Hello Vue'
	},
	filters: {

	},
	mounted: function () {
		this.CartView()
	},
	methods: {
		CartView () {
			this.title = 'Vue hello'
		}
	}
})