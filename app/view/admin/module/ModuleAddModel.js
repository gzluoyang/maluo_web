Ext.define('Admin.view.admin.module.ModuleAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.moduleAdd',
    data: {
        title: '新增模块',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/module/create',
        info:{
            app_id: 0
        }
    }

});
