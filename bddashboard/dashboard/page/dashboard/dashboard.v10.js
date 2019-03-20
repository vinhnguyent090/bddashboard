frappe.provide('bbdashboard.dashboard');

frappe.pages['dashboard'].on_page_load = function(wrapper) {

	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard',
		single_column: true
	});

	console.log(page)
  
	wrapper.setup = new bbdashboard.dashboard.SetupHelper(wrapper);
	window.cur_setup = wrapper.setup;
};

bbdashboard.dashboard.SetupHelper = class SetupHelper {
	constructor(wrapper) {
		this.wrapper = $(wrapper).find('.layout-main-section');
		this.page = wrapper.page;

		const assets = [
			//'assets/bbdashboard/css/setup.css'
		];

		frappe.require(assets, () => {
			this.make();
		});
	}

	make() {
		this.prepare_charts();
		this.make_charts();
	}
  
	prepare_charts() {
		this.wrapper.append(`
			<div id="bddashboard"></div>
		`);
	}

	make_charts() {
		this.dashboard = new Dashboard({
			wrapper: this.wrapper.find('#bddashboard')
		});
	}

};

class Dashboard {
	constructor({ wrapper }) {
		this.wrapper = wrapper;
		this.make();
	}

	make() {
		this.make_dom();

		// Charts data
		const data = {
			labels: ['12am-3am', '3am-6pm', '6am-9am', '9am-12am', '12pm-3pm', '3pm-6pm', '6pm-9pm', '9am-12am'],
			datasets: [
				{
					name: 'Some Data', type: 'bar',
					values: [25, 40, 30, 35, 8, 52, 17, -4]
				},
				{
					name: 'Another Set', type: 'line',
					values: [25, 50, -10, 15, 18, 32, 27, 14]
				}
			]
		};

		// Making charts
		this.make_charts(data);
	}

	make_dom() {
		this.wrapper.append(`
			<div class="charts"> 	
				<div id="chart1">
				</div>
			</div>
		`);
	}

	make_charts(data) {
		const chart = new frappeChart.Chart("#chart1", {  // or a DOM element,
			title: "My Chart",
			data: data,
			type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
			height: 250,
			colors: ['#7cd6fd', '#743ee2']
		})
		setTimeout(function () {chart.draw(!0)}, 1);
	}
}