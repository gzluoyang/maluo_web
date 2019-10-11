Ext.define('Admin.view.admin.button.ButtonsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.buttons',
    data: {
        menu: 'buttons',
        buttonData: {},
        hasCurrentRecord: false,
        menu_id: 0,
        parent_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttonData = get('buttonData');
            var text = '';
            if(buttonData.buttons_add)
                text = buttonData.buttons_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttonData = get('buttonData');
            var iconCls = '';
            if(buttonData.buttons_add)
                iconCls = buttonData.buttons_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttonData = get('buttonData');
            var text = '';
            if(buttonData.buttons_edit)
                text = buttonData.buttons_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttonData = get('buttonData');
            var iconCls = '';
            if(buttonData.buttons_edit)
                iconCls = buttonData.buttons_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttonData = get('buttonData');
            var text = '';
            if(buttonData.buttons_del)
                text = buttonData.buttons_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttonData = get('buttonData');
            var iconCls = '';
            if(buttonData.buttons_del)
                iconCls = buttonData.buttons_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_split1)
                return true;
            else
                return false;
		},
        textRole: function(get) {
            var buttonData = get('buttonData');
            var text = '';
            if(buttonData.buttons_role)
                text = buttonData.buttons_role.title;
            return text;
        },
        iconClsRole: function(get) {
            var buttonData = get('buttonData');
            var iconCls = '';
            if(buttonData.buttons_role)
                iconCls = buttonData.buttons_role.icon_cls;
            return iconCls;
        },
		hasRole: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_role)
                return true;
            else
                return false;
		},
		hasSplit2: function(get) {
			var buttonData = get('buttonData');
            if(buttonData.buttons_split2)
                return true;
            else
                return false;
		}
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        menutree: {
            type: 'menutree'
        },
        buttons: {
            type: 'buttons'
        }
    }
});
