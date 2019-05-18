Ext.define('Admin.view.admin.Roles',{
    extend: 'Ext.container.Container',
    xtype: 'roles',

    requires: [
        'Admin.view.admin.RolesController',
        'Admin.view.admin.RolesModel'
    ],

    controller: 'roles',
    viewModel: {
        type: 'roles'
    },

    html: 'Hello, World!!'
});
