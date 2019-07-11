Ext.define('Admin.store.admin.AccessStore', {
    extend: 'Ext.data.Store',

    alias: 'store.accesses',
    storeId: 'accessesStore',

    model: 'Admin.model.admin.AccessModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/access/index',
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

