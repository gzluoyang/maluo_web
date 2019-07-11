Ext.define('Admin.store.admin.ModuleTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.moduletree',
    storeId: 'moduleTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','title'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/module',
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

