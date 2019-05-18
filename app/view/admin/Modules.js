Ext.define('Admin.view.admin.Modules',{
    extend: 'Ext.container.Container',
    xtype: 'modules',

    requires: [
        'Admin.view.admin.ModulesController',
        'Admin.view.admin.ModulesModel'
    ],

    controller: 'modules',
    viewModel: {
        type: 'modules'
    },

    html: 'Hello, World!!'
});
