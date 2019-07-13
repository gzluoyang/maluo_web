Ext.define('Admin.view.admin.RolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roles',
    data: {
        parent_id: 0
    },
    stores: {
        accesstree: {
            type: 'accesstree'
        },
        roletree: {
            type: 'roletree'
        },
        roles: {
            type: 'roles'
        }
    }
});
