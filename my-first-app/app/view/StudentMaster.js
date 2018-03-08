Ext.define('School.view.StudentMaster', 
{
    extend : 'Ext.form.Panel',
    alias : 'widget.StudentMaster',
    config : {},
    
    constructor : function(config){
        this.initConfig(config);
        return this.callParent(arguments);
    },
    clearForm : function(){
        this.getForm().getFields().each(function(field){
            field.validateOnChange = false;
            if(field.name === "Id")
                field.setValue('0');
            else
                field.setValue('');
            field.resetOriginalValue();
        });
    },
    initComponent : function(){
        var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        Ext.apply(this, 
        {
            id : 'StudentMasterId',
            title : 'Student Information',
            url : '/ExampleService.svc/createstudent/',
            waitTitle : 'Status',
            waitMsgTarget : true,
            collapsible : true,
            bodyPadding : '5 5 5 5',
            buttonAlign : 'center',
            border : false,
            trackResetOnLoad : true,
            jsonSubmit : true,
            layout : 
            {
                type : 'vbox'
            },
            fieldDefaults : 
            {
                xtype : 'textfield',
                msgTarget : 'side',
                labelAlign : 'top',
                labelStyle : 'font-weight:bold'
            },
            items : [{
                xtype : 'fieldcontainer',
                layout : 'hbox',
                defaultType : 'textfield',
                width : '100%',
                fieldDefaults : 
                {
                    labelAlign : 'top',
                    labelStyle : 'font-weight:bold'
                },
                items : [{
                    fieldLabel : 'Id',
                    name : 'Id',
                    readOnly : true,
                    value : 0,
                    width : 35,
                    type : 'int'
                }, 
                {
                    fieldLabel : 'First Name',
                    flex : 1,
                    name : 'firstName',
                    beforeLabelTextTpl : required,
                    allowBlank : false,
                    margin : '0 0 0 5'
                }, 
                {
                    name : 'middleName',
                    width : 150,
                    margin : '0 0 0 5',
                    fieldLabel : 'Middle Name:'
                }, 
                {
                    fieldLabel : 'Last Name',
                    flex : 1,
                    margin : '0 0 0 5',
                    name : 'lastName'
                }]
            }, 
            {
                xtype : 'datefield',
                fieldLabel : 'Date of Birth',
                name : 'birthDate'
                
            }, 
            {
                xtype : 'textfield',
                fieldLabel : 'Address',
                width : '100%',
                name : 'address1'
            }, 
            {
                xtype : 'textfield',
                hideLabel : true,
                name : 'address2',
                width : '100%',
                fieldLabel : 'address2'
                
            }, 
            {
                xtype : 'textfield',
                fieldLabel : 'City',
                width : '100%',
                name : 'city'
            }, 
            {
                xtype : 'textfield',
                fieldLabel : 'state',
                width : '100%',
                name : 'state'
            }],
            buttons : [{
                text : 'Create',
                itemId : 'btnCreate',
                formBind : true
            }, 
            {
                text : 'Read Data',
                itemId : 'btnLoad'
            }, 
            {
                text : 'Update',
                itemId : 'btnUpdate',
                disabled : true,
                formBind : true
            }, 
            {
                text : 'Delete',
                itemId : 'btnDelete',
                formBind : true
            }, 
            {
                text : 'Reset',
                itemId : 'btnReset'
            }, 
            {
                text : 'Clear',
                itemId : 'btnClear'
            }]
        });
        
        this.callParent(arguments);
    }
});