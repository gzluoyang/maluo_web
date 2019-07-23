Ext.define('Admin.view.admin.access.AccessesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.accesses',
    data: {
        module_id: 0,
        app_id: 0
    },
    stores: {
        moduletree: {
            type: 'moduletree'
        },
        accesses: {
            type: 'accesses'
        }
    }
});
