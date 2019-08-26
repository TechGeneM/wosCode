export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Influenza',
					root: true,
					alignment: 'left',
					page: 'dashboard',
					translate: 'MENU.DASHBOARD',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'KPI',
					root: true,
					icon: 'la la-bar-chart',
					page: '/kpi',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Roster',
					root: true,
					icon: 'la la-user',
					page: '/roster'
				},

				{
					title: 'Team Settings',
					root: true,
					bullet: 'dot',
					icon: 'la la-group',
					page: '/team-settings'
				},
				{
					title: 'Reports',
					root: true,
					bullet: 'dot',
					icon: 'la la-files-o',
					page: '/reports'
				},
				{
					title: 'System Statistics',
					bullet: 'dot',
					icon: 'la la-area-chart',
					root: true,
					permission: 'accessToECommerceModule',
					page: '/statistics'
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
