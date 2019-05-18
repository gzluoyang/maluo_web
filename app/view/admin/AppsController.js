Ext.define('Admin.view.admin.AppsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.apps',
    
    onSearch: function() {
        var store = Ext.data.StoreManager.lookup('appStore');
        store.reload();
        return;
		var searchKeyField = this.lookup('searchKey');
		var searchKey = searchKeyField.getValue();

		var gridPanel = this.lookup('gridPanel');
		var store = gridPanel.getStore();
		var proxy = store.getProxy();

		if(searchKey != '') {
			proxy.setExtraParams({
				name: '%'+searchKey+'%'
			});
		} else {
			proxy.setExtraParams({
			});
		}

		store.loadPage(1);
	},

    onAdd: function() {
        var appAdd = Ext.create({
            xtype: 'app'
        });
        var viewModel = appAdd.getViewModel();
        viewModel.setData({
            actionModel: 'create'
        });
        appAdd.show();
    }
});
