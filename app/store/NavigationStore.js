Ext.define('Admin.store.NavigationStore', {
    extend: 'Ext.data.TreeStore',

 
    alias: 'store.navigationStore',
    storeId: 'navigationStore',

    autoLoad: true
//    nodeParam: 'app_id',
//    fields: ['id','text','viewType','iconCls'],
//	proxy: {
//		type: 'ajax',
//		url: '/api/admin/home/menus',
//		actionMethods: {
//			create: 'POST',
//			read: 'POST',
//			update: 'POST',
//			destroy: 'POST'
//		},
//		reader: {
//			type: 'json',
//			rootProperty: 'data'
//		}
//	},
//    root: {
//        id: 41,
//        text: '菜单',
//        expanded: false,
//        iconCls: 'x-fa fa-cloud-upload'
//    }
});
