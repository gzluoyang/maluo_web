Ext.define('Admin.store.admin.OrgTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.orgtree',
    storeId: 'orgTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/org',
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
        text: '机构树',
        iconCls: 'x-fa fa-home',
        expanded: true
    }
});

