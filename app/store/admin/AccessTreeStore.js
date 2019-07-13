Ext.define('Admin.store.admin.AccessTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.accesstree',
    storeId: 'accessTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/access',
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
        text: '访问树',
        iconCls: 'x-fa fa-lock',
        expanded: true
    }
});

