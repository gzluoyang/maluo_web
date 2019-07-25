Ext.define('Admin.store.admin.ButtonTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.buttontree',
    storeId: 'buttonTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','text'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/tree/button',
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
        text: '菜单树',
        iconCls: 'x-fa fa-globe',
        expanded: true
    }
});

