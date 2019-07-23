Ext.define('Admin.view.admin.user.UsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users',
    data: {
        roleTreeShow: false,
        parent_id: 0
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        orgtree: {
            type: 'orgtree'
        },
        users: {
            type: 'users'
        }
    }
});
