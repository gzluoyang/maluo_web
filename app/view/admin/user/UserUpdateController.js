Ext.define('Admin.view.admin.user.UserUpdateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userUpdate',
   
    onClose: function() {
        var win = this.getView();
        win.close();
    },
});
