Ext.define('Admin.model.admin.UserModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'username', type: 'string' },
        { name: 'status', type: 'boolean' }

    ]
});
