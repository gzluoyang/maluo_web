Ext.define('Admin.view.admin.ButtonUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.buttonUpdate',
  
	onSave: function() {		
		var actionUrl = this.getViewModel().get('actionUrl');

		var formPanel = this.lookup('formPanel');
		var form = formPanel.getForm();
		if(!form.isValid()) {
			Ext.MessageBox.alert({
				title: '错误',
				iconCls: 'fa fa-times-circle',
				buttons: Ext.MessageBox.OK,
				message: '数据验证失败!'
			});
			return;
		}

		var that = this;
		form.submit({
			url: actionUrl,
			success: function(form,action) {
				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '数据操作成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
						var data = action.result.data;
						that.refresh(data);
					}
				});
			},
			failure: function(form,action) {
                Ext.MessageBox.alert({
                    title: '错误',
                    iconCls: 'fa fa-times-circle',
                    buttons: Ext.MessageBox.OK,
                    message: action.result.message
                });
            }
		});
	},
   
	onReset: function() {
		this.getViewModel().setData({
            info: {}
		});
	},
    
    onClose: function() {
        var win = this.getView();
        win.close();
    },

	refresh: function(data) {
		var store = Ext.data.StoreManager.lookup('buttonsStore');
        store.reload();
        this.onClose();
	}    
});
