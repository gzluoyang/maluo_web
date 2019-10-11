Ext.define('Admin.view.admin.user.UsersModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users',
    data: {
        menu: 'users',
        buttons: {},
        roleTreeShow: false,
        parent_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.users_add)
                text = buttons.users_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.users_add)
                iconCls = buttons.users_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.users_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.users_edit)
                text = buttons.users_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.users_edit)
                iconCls = buttons.users_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.users_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.users_del)
                text = buttons.users_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.users_del)
                iconCls = buttons.users_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.users_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.users_split1)
                return true;
            else
                return false;
		},
        textRole: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.users_role)
                text = buttons.users_role.title;
            return text;
        },
        iconClsRole: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.users_role)
                iconCls = buttons.users_role.icon_cls;
            return iconCls;
        },
		hasRole: function(get) {
			var buttons = get('buttons');
            if(buttons.users_role)
                return true;
            else
                return false;
		},
		hasSplit2: function(get) {
			var buttons = get('buttons');
            if(buttons.users_split2)
                return true;
            else
                return false;
		}
    },
    stores: {
        roletree: {
            type: 'roletree'
        },
        orgtree: {
            type: 'orgtree'
        },
        users: {
            type: 'users'
        }
    }
});
