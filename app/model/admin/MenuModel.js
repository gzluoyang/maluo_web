Ext.define('Admin.model.admin.MenuModel', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'url', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'icon_cls', type: 'string' },
        { name: 'tab_index', type: 'int' },
        { name: 'status', type: 'boolean' },
        { name: 'memo', type: 'string' },
        { name: 'create_time', type: 'date' },
        { name: 'update_time', type: 'date' }
    ]
});
