Ext.define('Admin.view.admin.Groups',{
    extend: 'Ext.container.Container',
    xtype: 'groups',

    requires: [
        'Admin.view.admin.GroupsController',
        'Admin.view.admin.GroupsModel'
    ],

    controller: 'groups',
    viewModel: {
        type: 'groups'
    },

    html: 'Hello, World!!'
});
