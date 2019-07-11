Ext.define('Admin.store.admin.MenuTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.menutree',
    storeId: 'menuTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','title'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/menu',
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
        text: '应用列表',
        iconCls: 'x-fa fa-globe',
        expanded: true
    }
});

