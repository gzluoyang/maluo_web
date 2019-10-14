Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onRouteChange'
            }
        }
    },

    routes: {
        ':node': 'onRouteChange'
    },

    loaded: false,
    hashTag: 'dashboard',
    lastView: null,

    onMainViewRender:function() {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    init: function(view) {
        var me = this;
        var url = '/api/admin/home/isLogin';
		Ext.Ajax.request({
			url: url
		}).then(function(response, opts) {
 			var obj = Ext.decode(response.responseText);
			if(obj.success === false) {
                me.redirectTo('login', true);
                return;
            }

            //me.initAppMenu();
        },function(response,opt){
            me.redirectTo('login', true);
        });
    },
    initNavMenu: function(app_id) {
        var me = this;
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('navs');
        var url = '/api/admin/home/menus';
        Ext.Ajax.request({
            url: url,
            params: {
                app_id: app_id
            },
            success: function(response,opts) {
                var refs = me.getReferences();
                var treeList = refs.navigationTreeList;
                var data = Ext.decode(response.responseText);
                var root = {
                    expanded: true,
                    children: data
                };
                store.setRoot(root);
                treeList.setStore(store);
                me.loaded = true;
            }
       });
    },
    initAppMenu: function() {
        var me = this;
        var url = '/api/admin/home/apps';
		Ext.Ajax.request({
			url: url
		}).then(function(response, opts) {
            var refs = me.getReferences();
            var segmentedbutton= refs.segmentedbutton;
            var data = Ext.decode(response.responseText);
            if(data && data.length > 0) {
                var item = data[0];
                var app_id = item.value;
                me.initNavMenu(app_id);
                
                data[0].pressed = true;
                segmentedbutton.add(data);
            }
		},function(response, opts) {
			var obj = Ext.decode(response.responseText);
			Ext.MessageBox.alert({
				title: '错误',
				iconCls: 'fa fa-times-circle',
				buttons: Ext.MessageBox.OK,
                fn: function() {
                    me.redirectTo('login', true);
                },
				message: obj.message
			});
		});
    },
    changeApp: function(button,newValue,oldValue,opts) {
        if(newValue)
            this.initNavMenu(newValue);
    },
    setCurrentView: function(hashTag) {
        hashTag = (hashTag || '').toLowerCase();
        this.hashTag = hashTag;

        var me = this;

        if(hashTag == 'dashboard')
            me.initAppMenu();

        var refs = me.getReferences();
        var mainCard = refs.mainCardPanel;
        var mainLayout = mainCard.getLayout();
        var navigationList = refs.navigationTreeList;

        var viewModel = this.getViewModel();
        var store = viewModel.getStore('navs');
        var node = store.findNode('routeId', hashTag) ||
               store.findNode('viewType', hashTag);
        var view = (node && node.get('viewType')) || 'login';

        if(!this.loaded)
            view = hashTag;

        var lastView = me.lastView;
        var existingItem = mainCard.child('component[routeId=' + hashTag + ']');
        var newView;

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.setSelection(node);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    onToggleNavigationSize: function () {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout();  // ... since this will flush them
        }
        else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({isRoot: true});
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function () {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    onRouteChange:function(id){
        this.setCurrentView(id);
    },

    onSearchRouteChange: function () {
        this.setCurrentView('searchresults');
    },

    onSwitchToModern: function () {
        Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                        this.onSwitchToModernConfirmed, this);
    },

    onSwitchToModernConfirmed: function (choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    onEmailRouteChange: function () {
        this.setCurrentView('email');
    },

	onLogout: function() {
		var that = this;
		Ext.Ajax.request({
			url: '/api/admin/user/logout',
			method: 'post',
			scope: that,
		}).then(function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if(obj.success == true) {
				that.redirectTo("login", true);
                window.location.reload();
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
	}
});
