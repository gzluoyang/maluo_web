Ext.define('Admin.view.admin.app.AppsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.apps',
    data: {
        menu: 'apps',
        buttons: {},
        hasCurrentRecord: false
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.apps_add)
                text = buttons.apps_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.apps_add)
                iconCls = buttons.apps_add.icon_cls;
            console.log(iconCls);
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_add)
                return true;
            else
                return false;
		},
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_edit)
                return true;
            else
                return false;
		},
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_del)
                return true;
            else
                return false;
		}
    },
    stores: {
        apps: {
            type: 'apps'
        }
    }
});
