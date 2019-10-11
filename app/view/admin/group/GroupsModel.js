Ext.define('Admin.view.admin.group.GroupsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.groups',
    data: {
        menu: 'groups',
        buttons: {},
        hasCurrentRecord: false,
        app_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.groups_add)
                text = buttons.groups_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.groups_add)
                iconCls = buttons.groups_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.groups_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.groups_edit)
                text = buttons.groups_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.groups_edit)
                iconCls = buttons.groups_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.groups_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.groups_del)
                text = buttons.groups_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.groups_del)
                iconCls = buttons.groups_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.groups_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.groups_split1)
                return true;
            else
                return false;
		}
    },
    stores: {
        apptree: {
            type: 'apptree'
        },
        groups: {
            type: 'groups'
        }
    }
});
