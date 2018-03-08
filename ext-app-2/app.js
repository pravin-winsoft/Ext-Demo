Ext.application({
	requires: ['Ext.container.Viewport'],
	name: 'Accountform',
	views:['Accountform.view.AccountMaster'],
	controllers: ['AccountMaster'],
	
	launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
            {
                xtype: 'AccountMaster'
            }]
        });
    }

});