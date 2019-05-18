Ext.define('Admin.view.admin.UsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users',
     stores: {
        users: {
            type: 'users'
        }
    },
    data: {
        name: 'Admin'
    }

});
