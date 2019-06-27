Ext.define('Admin.store.admin.AppTreeStore', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.apptree',
    storeId: 'appTreeStore',

    nodeParam: 'parent_id',
    fields: ['id','title'],
	proxy: {
		type: 'ajax',
		url: '/api/admin/app/tree',
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
    },
	listeners: {
		load: 'onTreeStoreLoad'
	}
});

