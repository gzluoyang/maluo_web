Ext.define('Admin.store.admin.OrgStore', {
    extend: 'Ext.data.Store',

    alias: 'store.orgs',
    storeId: 'orgsStore',

    model: 'Admin.model.admin.OrgModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/org/index',
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

