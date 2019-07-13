Ext.define('Admin.view.admin.RoleUpdateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.roleUpdate',
    data: {
        title: '修改菜单',
        actionUrl: '/api/admin/Role/update',
        info:{}
    },
	formulas: {
		isEditable: function(get) {
			var actinoModel = get('actionModel');
			if(actinoModel == 'info') {
				return false;
			} else {
				return true;
			}
		},
        createTime: function(get) {
            var info = get('info');
            var dt = info.create_time;
            return Ext.Date.format(dt,'Y-m-d H:i:s');
        },
        updateTime: function(get) {
            var info = get('info');
            var dt = info.update_time;
            return Ext.Date.format(dt,'Y-m-d H:i:s');
        },
		title: function(get) {
			var actinoModel = get('actionModel');
			if(actinoModel == 'info') {
				return '详情';
			}
			if(actinoModel == 'update') {
				return '修改';
			}
			return '';
		},
		iconCls: function(get) {
			var actinoModel = get('actionModel');
			if(actinoModel == 'info') {
				return 'fa fa-info-circle';
			}
			if(actinoModel == 'update') {
				return 'fa fa-edit';
			}
			return 'fa-window-maximize';
		}
	}
});
