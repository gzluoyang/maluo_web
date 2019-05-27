Ext.define('Admin.view.admin.GroupsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groups',
     
    onSearch: function() {
        var store = Ext.data.StoreManager.lookup('groupStore');
		var searchKeyField = this.lookup('searchKey');
		var searchKey = searchKeyField.getValue();

		var gridPanel = this.lookup('gridPanel');
		var store = gridPanel.getStore();
		var proxy = store.getProxy();

		if(searchKey != '') {
			proxy.setExtraParams({
				title: '%'+searchKey+'%'
			});
		} else {
			proxy.setExtraParams({
			});
		}

		store.loadPage(1);
	},

	onSelectionChange: function(me,records,eOpts) {
		var config = {
			hasCurrentRecord: false
		};
		
		if(records && records.length > 0) {
			config.hasCurrentRecord = true;
		}

		if(config.hasCurrentRecord) {
			var record = records[0];
		}
		this.getViewModel().setData(config);
	},

	onRowDbClick: function(me,record,element,rowIndex,e,eOpts) {
		this.loadRecord(record,'info');
	},

	onEdit: function() {
		var record = this.findCurrentRecord();
		this.loadRecord(record,'update');
	},

	onRemove: function() {
		var that = this;
		Ext.MessageBox.alert({
			title: '提醒',
			iconCls: 'fa fa-help-circle',
			message: '你确定要删除该记录吗？',
			buttons: Ext.MessageBox.YESNO,
			scope: that,
			fn: function(buttonId) {
				if(buttonId == 'yes') {
					that.removeRecord();
				}
			}
		});
	},

	/* private function section */

	removeRecord: function() {
		var record = this.findCurrentRecord();
		var id = record.get('id');
		var that = this;
		Ext.Ajax.request({
			url: '/api/admin/group/delete',
			method: 'post',
			scope: that,
			params : {
				id: id
			}
		}).then(function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if(obj.success == true) {
				Ext.MessageBox.alert({
					title: '成功',
					iconCls: 'fa fa-check-circle',
					message: '数据操作成功',
					buttons: Ext.MessageBox.OK,
					scope: that,
					fn: function() {
						this.getViewModel().set('hasCurrentRecord',false);
						var store = Ext.data.StoreManager.lookup('groupsStore');
						store.reload();
					}
				});
			} else {
				Ext.MessageBox.alert({
					title: '错误',
					iconCls: 'fa fa-times-circle',
					buttons: Ext.MessageBox.OK,
					message: obj.msg
				});
			}
		},function(response, opts) {
			var obj = Ext.decode(response.responseText);
			Ext.MessageBox.alert({
				title: '错误',
				iconCls: 'fa fa-times-circle',
				buttons: Ext.MessageBox.OK,
				message: obj.msg
			});
		});
	},

	findCurrentRecord: function() {
		var gridPanel = this.lookup('gridPanel');
		var records = gridPanel.getSelection();
		if(records) {
			return records[0];
		} else {
			return null;
		}
	},

	loadRecord : function(record,actionModel) {
		var groupWindow = Ext.create({
			xtype: 'groupUpdate'
		});
		var info = Ext.clone(record.data);
		var old = Ext.clone(record.data);
		groupWindow.getViewModel().setData({
			actionModel: actionModel,
			old: old,
			info: info
		});
		groupWindow.show();
	},

    onAdd: function() {
        var addWin = Ext.create({
            xtype: 'groupAdd'
        });

        var viewModel = addWin.getViewModel();
        viewModel.setData({});

        addWin.show();
    }
   
});
