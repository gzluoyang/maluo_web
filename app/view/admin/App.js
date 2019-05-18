Ext.define('Admin.view.admin.App',{
    extend: 'Ext.window.Window',
    xtype: 'app',

    requires: [
        'Admin.view.admin.AppController',
        'Admin.view.admin.AppModel'
    ],

    controller: 'app',
    viewModel: {
        type: 'app'
    },

    html: 'Hello, World!!'
});
