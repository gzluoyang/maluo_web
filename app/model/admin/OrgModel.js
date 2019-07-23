Ext.define('Admin.model.admin.OrgModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'tab_index', type: 'int' },
        { name: 'status', type: 'boolean' },
        { name: 'memo', type: 'string' },
        { name: 'create_time', type: 'date' },
        { name: 'update_time', type: 'date' }
    ]
});
