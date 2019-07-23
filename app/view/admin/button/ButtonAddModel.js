Ext.define('Admin.view.admin.button.ButtonAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.buttonAdd',
    data: {
        title: '新增按钮',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Button/create',
        info:{
            menu_id: 0
        }
    }

});
