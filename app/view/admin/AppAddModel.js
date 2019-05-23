Ext.define('Admin.view.admin.AppAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.appAdd',
    data: {
        title: '新增',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/App/save',
        info:{}
    }

});
