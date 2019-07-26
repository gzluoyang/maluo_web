Ext.define('Admin.store.admin.ModuleTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.moduletree',
    storeId: 'moduleTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
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
        text: '模块树',
        iconCls: 'x-fa fa-cubes',
        expanded: true
    }
});

