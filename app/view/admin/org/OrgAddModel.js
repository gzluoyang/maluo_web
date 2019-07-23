Ext.define('Admin.view.admin.org.OrgAddModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orgAdd',
    data: {
        title: '新增机构',
        iconCls: 'fa fa-plus-circle',
        actionUrl: '/api/admin/Org/create',
        info:{
            parent_id: 0
        }
    }

});
