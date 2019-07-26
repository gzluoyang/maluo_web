Ext.define('Admin.view.admin.menu.MenusModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menus',
    data: {
        hasCurrentRecord: false,
        group_id: 0,
        app_id: 0
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        grouptree: {
            type: 'grouptree'
        },
        menus: {
            type: 'menus'
        }
    }
});
