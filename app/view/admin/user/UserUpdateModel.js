Ext.define('Admin.view.admin.user.UserUpdateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userUpdate',
    data: {
        title: '用户详情',
        actionUrl: '/api/admin/user/info',
        iconCls: 'fa fa-info-circle',
        info:{}
    },
	formulas: {
        lastLoginTime: function(get) {
            var info = get('info');
            var dt = info.last_login_time;
            return Ext.Date.format(dt,'Y-m-d H:i:s');
        },
        regTime: function(get) {
            var info = get('info');
            var dt = info.reg_time;
            return Ext.Date.format(dt,'Y-m-d H:i:s');
        }
	}
});
