Ext.define('Admin.view.admin.role.RolesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roles',
    data: {
        menu: 'roles',
        buttons: {},
        settings: ['userTree','accessTree','menuTree','buttonTree'],
        hasCurrentRecord: false,
        parent_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_add)
                text = buttons.roles_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_add)
                iconCls = buttons.roles_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_edit)
                text = buttons.roles_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_edit)
                iconCls = buttons.roles_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_del)
                text = buttons.roles_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_del)
                iconCls = buttons.roles_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_split1)
                return true;
            else
                return false;
		},
        textUser: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_user)
                text = buttons.roles_user.title;
            return text;
        },
        iconClsUser: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_user)
                iconCls = buttons.roles_user.icon_cls;
            return iconCls;
        },
		hasUser: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_user)
                return true;
            else
                return false;
		},
        textAccess: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_access)
                text = buttons.roles_access.title;
            return text;
        },
        iconClsAccess: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_access)
                iconCls = buttons.roles_access.icon_cls;
            return iconCls;
        },
		hasAccess: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_access)
                return true;
            else
                return false;
		},
		hasSplit2: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_split2)
                return true;
            else
                return false;
		},
        textMenu: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_menu)
                text = buttons.roles_menu.title;
            return text;
        },
        iconClsMenu: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_menu)
                iconCls = buttons.roles_menu.icon_cls;
            return iconCls;
        },
		hasMenu: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_menu)
                return true;
            else
                return false;
		},
        textButton: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.roles_button)
                text = buttons.roles_button.title;
            return text;
        },
        iconClsButton: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.roles_button)
                iconCls = buttons.roles_button.icon_cls;
            return iconCls;
        },
		hasButton: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_button)
                return true;
            else
                return false;
		},
		hasSplit3: function(get) {
			var buttons = get('buttons');
            if(buttons.roles_split3)
                return true;
            else
                return false;
		}
    },
    stores: {
        menutree: {
            type: 'menutree'
        },
        buttontree: {
            type: 'buttontree'
        },
        accesstree: {
            type: 'accesstree'
        },
        usertree: {
            type: 'usertree'
        },
        roletree: {
            type: 'roletree'
        },
        roles: {
            type: 'roles'
        }
    }
});
