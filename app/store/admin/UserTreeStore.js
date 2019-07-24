Ext.define('Admin.store.admin.UserTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.usertree',
    storeId: 'userTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/user',
		actionMethods: {
			create: 'POST',
			read: 'POST',
			update: 'POST',
			destroy: 'POST'
		},
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
    root: {
        id: 0,
        text: '用户树',
        iconCls: 'x-fa fa-user',
        expanded: true
    }
});

