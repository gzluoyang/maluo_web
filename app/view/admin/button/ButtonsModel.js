Ext.define('Admin.view.admin.button.ButtonsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.buttons',
    data: {
        menu_id: 0,
        parent_id: 0
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        menutree: {
            type: 'menutree'
        },
        buttons: {
            type: 'buttons'
        }
    }
});
