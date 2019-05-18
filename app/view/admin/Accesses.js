
Ext.define('Admin.view.admin.Accesses',{
    extend: 'Ext.container.Container',

    requires: [
        'Admin.view.admin.AccessesController',
        'Admin.view.admin.AccessesModel'
    ],

    controller: 'admin-accesses',
    viewModel: {
        type: 'admin-accesses'
    },

    html: 'Hello, World!!'
});
