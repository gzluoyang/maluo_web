Ext.define('Admin.model.admin.AppModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'memo', type: 'string' }

    ]
});
