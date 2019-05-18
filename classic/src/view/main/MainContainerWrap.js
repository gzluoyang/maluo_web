Ext.define('Admin.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

    requires : [
        'Ext.layout.container.HBox'
    ],

    scrollable: false,

    layout: {
        type: 'hbox',
        align: 'stretch',
        //align: 'stretchmax',

        // Tell the layout to animate the x/width of the child items.
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },

    beforeLayout : function() {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight() - 64,  // offset by topmost toolbar height
            // We use itemId/getComponent instead of "reference" because the initial
            // layout occurs too early for the reference to be resolved
            navTree = me.getComponent('navigationTreeList');

        //me.height = height;
        //me.minHeight = height;
        /*
        me.setStyle({
            'height': height + 'px',
            //'min-height': height + 'px'
        });
        */
 
        /*
        var contentPanel = me.getComponent('contentPanel');
        contentPanel.setStyle({
            'overflow-y': 'auto',
            'height': height + 'px',
            //'min-height': height + 'px'
        });
        */

        navTree.setStyle({
            'overflow-y': 'auto',
            'height': height + 'px'
            //'min-height': height + 'px'
        });

        me.callParent(arguments);
    }
});
