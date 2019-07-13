Ext.define('Admin.view.admin.RoleAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roleAdd',
    data: {
        title: '新增角色',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Role/create',
        info:{
            parent_id: 0
        }
    }

});
