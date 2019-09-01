Ext.define('Admin.view.admin.app.AppsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps',
    data: {
        testHidden: false,
        hasCurrentRecord: false
    },
	formulas: {
		isEditable: function(get) {
			var actinoModel = get('actionModel');
		}
    },
    stores: {
        apps: {
            type: 'apps'
        }
    }
});
