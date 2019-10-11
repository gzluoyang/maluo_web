Ext.define('Admin.view.admin.org.OrgsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orgs',
    data: {
        menu: 'orgs',
        buttons: {},
        accessTreeShow: false,
        parent_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.orgs_add)
                text = buttons.orgs_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.orgs_add)
                iconCls = buttons.orgs_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.orgs_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.orgs_edit)
                text = buttons.orgs_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.orgs_edit)
                iconCls = buttons.orgs_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.orgs_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.orgs_del)
                text = buttons.orgs_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.orgs_del)
                iconCls = buttons.orgs_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.orgs_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.orgs_split1)
                return true;
            else
                return false;
		}
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
