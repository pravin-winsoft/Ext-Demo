Ext.define('Accountform.view.AccountMaster',{
	extend : 'Ext.form.Panel',
    alias : 'widget.AccountMaster',
    config : {},
     constructor : function(config){
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    items : [{
    	xtype: 'textfield',
        name: 'username',
        fieldLabel: 'User Name',
        allowBlank: false,
        minLength: 6
    }, {
	     xtype: 'textfield',
	     name: 'email',
	     fieldLabel: 'Email Address',
	     vtype: 'email',
	     allowBlank: false
	  }, {
	     xtype: 'textfield',
	     name: 'password1',
	     fieldLabel: 'Password',
	     inputType: 'password',
	     style: 'margin-top:15px',
	     allowBlank: false,
	     minLength: 8
	  }, {
	     xtype: 'textfield',
	     name: 'password2',
	     fieldLabel: 'Repeat Password',
	     inputType: 'password',
	     allowBlank: false,
	     /**
	      * Custom validator implementation - checks that the value matches what was entered into
	      * the password1 field.
	      */
	     validator: function(value) {
	        var password1 = this.previousSibling('[name=password1]');
	        return (value === password1.getValue()) ? true : 'Passwords do not match.'
	     }
	  }]
});