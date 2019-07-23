Ext.define('Admin.view.admin.module.ModulesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modules',
    data: {
        app_id: 0
    },
    stores: {
        apptree: {
            type: 'apptree'
        },
        modules: {
            type: 'modules'
        }
    }
});
