Ext.define('Admin.view.admin.module.ModulesModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.modules',
    data: {
        menu: 'modules',
        buttons: {},
        hasCurrentRecord: false,
        app_id: 0
    },
	formulas: {
        textAdd: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.modules_add)
                text = buttons.modules_add.title;
            return text;
        },
        iconClsAdd: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.modules_add)
                iconCls = buttons.modules_add.icon_cls;
            return iconCls;
        },
		hasAdd: function(get) {
			var buttons = get('buttons');
            if(buttons.modules_add)
                return true;
            else
                return false;
		},
        textEdit: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.modules_edit)
                text = buttons.modules_edit.title;
            return text;
        },
        iconClsEdit: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.modules_edit)
                iconCls = buttons.modules_edit.icon_cls;
            return iconCls;
        },
		hasEdit: function(get) {
			var buttons = get('buttons');
            if(buttons.modules_edit)
                return true;
            else
                return false;
		},
        textDel: function(get) {
            var buttons = get('buttons');
            var text = '';
            if(buttons.modules_del)
                text = buttons.modules_del.title;
            return text;
        },
        iconClsDel: function(get) {
            var buttons = get('buttons');
            var iconCls = '';
            if(buttons.modules_del)
                iconCls = buttons.modules_del.icon_cls;
            return iconCls;
        },
		hasDel: function(get) {
			var buttons = get('buttons');
            if(buttons.modules_del)
                return true;
            else
                return false;
		},
		hasSplit1: function(get) {
			var buttons = get('buttons');
            if(buttons.modules_split1)
                return true;
            else
                return false;
		}
    },
    stores: {
        apptree: {
            type: 'apptree'
        },
        modules: {
            type: 'modules'
        }
    }
});
