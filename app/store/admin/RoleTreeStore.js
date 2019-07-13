Ext.define('Admin.store.admin.RoleTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.roletree',
    storeId: 'roleTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/role',
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
        text: '角色树',
        iconCls: 'x-fa fa-users',
        expanded: true
    }
});

