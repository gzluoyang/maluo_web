Ext.define('Admin.view.admin.GroupsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groups',
    stores: {
        apptree: {
            type: 'apptree'
        },
        groups: {
            type: 'groups'
        }
    }
});
