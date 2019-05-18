Ext.define('Admin.view.admin.Buttons',{
    extend: 'Ext.container.Container',
    xtype: 'buttons',

    requires: [
        'Admin.view.admin.ButtonsController',
        'Admin.view.admin.ButtonsModel'
    ],

    controller: 'buttons',
    viewModel: {
        type: 'buttons'
    },

    html: 'Hello, World!!'
});
