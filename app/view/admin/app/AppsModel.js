Ext.define('Admin.view.admin.app.AppsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps',
    data: {
        hasCurrentRecord: false
    },
    stores: {
        apps: {
            type: 'apps'
        }
    }
});
