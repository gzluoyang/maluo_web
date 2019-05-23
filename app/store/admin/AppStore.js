Ext.define('Admin.store.admin.AppStore', {
    extend: 'Ext.data.Store',

    alias: 'store.apps',
    storeId: 'appsStore',

    model: 'Admin.model.admin.AppModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/app/index',
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
	},
	listeners: {
		//load: 'onStoreLoad'
	},
	autoLoad: true
});

