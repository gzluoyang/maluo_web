Ext.define('Admin.view.admin.app.AppAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.appAdd',
    data: {
        title: '新增',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/app/create',
        info:{}
    }

});
