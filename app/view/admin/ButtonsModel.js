Ext.define('Admin.view.admin.ButtonsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.buttons',
    data: {
        menu_id: 0,
        parent_id: 0
    },
    stores: {
        menutree: {
            type: 'menutree'
        },
        buttons: {
            type: 'buttons'
        }
    }
});
