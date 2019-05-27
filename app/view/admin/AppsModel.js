Ext.define('Admin.view.admin.AppsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps',
    stores: {
        apps: {
            type: 'apps'
        }
    }
});
