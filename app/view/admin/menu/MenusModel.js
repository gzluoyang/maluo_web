Ext.define('Admin.view.admin.menu.MenusModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menus',
    data: {
        group_id: 0,
        app_id: 0
    },
    stores: {
        grouptree: {
            type: 'grouptree'
        },
        menus: {
            type: 'menus'
        }
    }
});
