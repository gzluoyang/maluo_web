Ext.define('Admin.view.admin.role.RolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roles',
    data: {
        settings: ['userTree','accessTree','menuTree','buttonTree'],
        hasCurrentRecord: false,
        parent_id: 0
    },
    stores: {
        menutree: {
            type: 'menutree'
        },
        buttontree: {
            type: 'buttontree'
        },
        accesstree: {
            type: 'accesstree'
        },
        usertree: {
            type: 'usertree'
        },
        roletree: {
            type: 'roletree'
        },
        roles: {
            type: 'roles'
        }
    }
});
