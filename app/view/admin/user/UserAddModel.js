Ext.define('Admin.view.admin.user.UserAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userAdd',
    data: {
        title: '新增用户',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/user/create',
        info:{
            org_id: 0
        }
    }

});
