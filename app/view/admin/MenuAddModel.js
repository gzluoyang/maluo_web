Ext.define('Admin.view.admin.MenuAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menuAdd',
    data: {
        title: '新增菜单',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Menu/create',
        info:{
            menu_id: 0
        }
    }

});
