Ext.define('Admin.view.admin.menu.MenusModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.menus',
    data: {
        menu: 'menus',
        buttons: {},
        hasCurrentRecord: false,
        group_id: 0,
        app_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.menus_add)
                text = buttons.menus_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.menus_add)
                iconCls = buttons.menus_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.menus_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.menus_edit)
                text = buttons.menus_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.menus_edit)
                iconCls = buttons.menus_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.menus_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.menus_del)
                text = buttons.menus_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.menus_del)
                iconCls = buttons.menus_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.menus_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.menus_split1)
                return true;
            else
                return false;
		}
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        grouptree: {
            type: 'grouptree'
        },
        menus: {
            type: 'menus'
        }
    }
});
