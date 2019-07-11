Ext.define('Admin.store.admin.ModuleStore', {
    extend: 'Ext.data.Store',

    alias: 'store.modules',
    storeId: 'modulesStore',

    model: 'Admin.model.admin.ModuleModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/module/index',
		actionMethods: {
			create: 'POST',
			read: 'POST',
			update: 'POST',
			destroy: 'POST'
		},
		simpleSortMode: true,
		limitParam: 'limit',
		pageParam: 'page',
		sortParam: 'sort',
		directionParam: 'dir',
		startParam: '',
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total'
		}
	}
});

