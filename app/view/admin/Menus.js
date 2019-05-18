
Ext.define('Admin.view.admin.Menus',{
    extend: 'Ext.container.Container',
    xtype: 'menus',

    requires: [
        'Admin.view.admin.MenusController',
        'Admin.view.admin.MenusModel'
    ],

    controller: 'menus',
    viewModel: {
        type: 'menus'
    },

    html: 'Hello, World!!'
});
