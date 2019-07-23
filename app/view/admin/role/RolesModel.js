Ext.define('Admin.view.admin.role.RolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roles',
    data: {
        accessTreeShow: false,
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
