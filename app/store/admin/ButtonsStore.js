Ext.define('Admin.store.admin.ButtonStore', {
    extend: 'Ext.data.Store',

    alias: 'store.buttons',
    storeId: 'buttonsStore',

    model: 'Admin.model.admin.ButtonModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/button/index',
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

