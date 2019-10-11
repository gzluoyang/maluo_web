Ext.define('Admin.view.admin.access.AccessesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.accesses',
    data: {
        menu: 'accesses',
        buttons: {},
        hasCurrentRecord: false,
        module_id: 0,
        app_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.accesses_add)
                text = buttons.accesses_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.accesses_add)
                iconCls = buttons.accesses_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.accesses_edit)
                text = buttons.accesses_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.accesses_edit)
                iconCls = buttons.accesses_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.accesses_del)
                text = buttons.accesses_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.accesses_del)
                iconCls = buttons.accesses_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_split1)
                return true;
            else
                return false;
		},
        textRole: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.accesses_role)
                text = buttons.accesses_role.title;
            return text;
        },
        iconClsRole: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.accesses_role)
                iconCls = buttons.accesses_role.icon_cls;
            return iconCls;
        },
		hasRole: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_role)
                return true;
            else
                return false;
		},
		hasSplit2: function(get) {
			var buttons = get('buttons');
            if(buttons.accesses_split2)
                return true;
            else
                return false;
		}
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        moduletree: {
            type: 'moduletree'
        },
        accesses: {
            type: 'accesses'
        }
    }
});
