Ext.define('Admin.view.admin.group.GroupAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groupAdd',
    data: {
        title: '新增分组',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Group/create',
        info:{
            app_id: 0
        }
    }

});
