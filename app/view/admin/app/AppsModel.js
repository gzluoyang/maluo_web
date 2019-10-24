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
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.apps_edit)
                text = buttons.apps_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.apps_edit)
                iconCls = buttons.apps_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.apps_del)
                text = buttons.apps_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.apps_del)
                iconCls = buttons.apps_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_split1)
                return true;
            else
                return false;
		},
        textRole: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.apps_role)
                text = buttons.apps_role.title;
            return text;
        },
        iconClsRole: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.apps_role)
                iconCls = buttons.apps_role.icon_cls;
            return iconCls;
        },
		hasRole: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_role)
                return true;
            else
                return false;
		},
		hasSplit2: function(get) {
			var buttons = get('buttons');
            if(buttons.apps_split2)
                return true;
            else
                return false;
		}
    },
    stores: {
        apps: {
            type: 'apps'
        },
        roletree: {
            type: 'roletree'
        }
    }
});
