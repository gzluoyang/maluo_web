Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    stores: {
        navs: {
            type: 'navigationStore'
        }
    },
    data: {
        currentView: null
    }
});
