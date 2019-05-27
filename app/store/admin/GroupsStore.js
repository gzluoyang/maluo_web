Ext.define('Admin.store.admin.GroupStore', {
    extend: 'Ext.data.Store',

    alias: 'store.groups',
    storeId: 'groupsStore',

    model: 'Admin.model.admin.GroupModel',
	pageSize: 15,
	remoteSort: true,
	proxy: {
		type: 'ajax',
		url: '/api/admin/group/index',
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
	autoLoad: true
});

