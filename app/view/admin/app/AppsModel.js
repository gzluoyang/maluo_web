Ext.define('Admin.view.admin.app.AppsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps',
    stores: {
        apps: {
            type: 'apps'
        }
    }
});
