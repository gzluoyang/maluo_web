Ext.define('Admin.view.admin.access.AccessAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.accessAdd',
    data: {
        title: '新增访问',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Access/create',
        info:{
            module_id: 0
        }
    }

});
