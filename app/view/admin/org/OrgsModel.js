Ext.define('Admin.view.admin.org.OrgsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orgs',
    data: {
        accessTreeShow: false,
        parent_id: 0
    },
    stores: {
        orgtree: {
            type: 'orgtree'
        },
        orgs: {
            type: 'orgs'
        }
    }
});
