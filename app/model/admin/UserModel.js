Ext.define('Admin.model.admin.UserModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'username', type: 'string' },
        { name: 'tab_index', type: 'int' },
        { name: 'status', type: 'boolean' },
        { name: 'login_count', type: 'int' },
        { name: 'last_login_ip', type: 'int' },
        { name: 'last_login_time', type: 'int' },
        { name: 'reg_ip', type: 'int' },
        { name: 'reg_time', type: 'int' }
    ]
});
