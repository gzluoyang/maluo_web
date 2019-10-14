Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    onLoginButton: function() {
		var that = this;
		var loginForm = this.getView();
		var form = loginForm.getForm();

		if(!form.isValid()) {
			Ext.MessageBox.alert({
				title: '错误',
				iconCls: 'fa fa-times-circle',
				buttons: Ext.MessageBox.OK,
				message: '数据验证失败!'
			});
			return;
		}

		form.submit({
			url: '/api/admin/user/login',
			success: function(form, action) {
				that.redirectTo('dashboard', true);
                window.location.reload();
			},
			failure: function(form, action) {
				Ext.MessageBox.alert({
					title: '异常',
					iconCls: 'fa fa-times-circle',
					buttons: Ext.MessageBox.OK,
					message: action.result.message
				});
			}
		});
    }
});
