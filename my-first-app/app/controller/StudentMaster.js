Ext.define('School.controller.StudentMaster',
{
    extend: 'Ext.app.Controller',
    models: ['School.model.Student'],
    views: ['School.view.StudentMaster'],

    refs: [{
        ref: 'studentMasterForm',
        selector: 'viewport > StudentMaster'
    }],

    init: function () {

        this.control({
            'viewport > StudentMaster button[itemId=btnCreate]':
            {
                click: this.onCreateClick
            },
            'viewport > StudentMaster button[itemId=btnLoad]':
            {
                click: this.onLoadClick
            },
            'viewport > StudentMaster button[itemId=btnUpdate]':
            {
                click: this.onUpdateClick
            },
            'viewport > StudentMaster button[itemId=btnDelete]':
            {
                click: this.onDeleteClick
            },
            'viewport > StudentMaster button[itemId=btnReset]': {
                click: this.onResetClick
            },
            'viewport > StudentMaster button[itemId=btnClear]': {
                click: this.onClearClick
            }
        });
    },
    onCreateClick: function () {

        var stdMaster = this.getStudentMasterForm();

        if (!stdMaster.isDirty()) {
            Ext.Msg.alert('Status', 'No new student data to create.');
            return;
        }

        if (stdMaster.isValid()) {
            // Submit the Ajax request and handle the response
            stdMaster.submit({
                waitMsg: 'Saving..',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                clientValidation: true,
                success: function (form, action) {

                    var student = Ext.create('School.model.Student');
                    var resp = Ext.decode(action.response.responseText);

                    if (resp.data[0]) {
                        // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                        student.set(resp.data[0]);
                        stdMaster.loadRecord(student);
                    }

                    Ext.Msg.alert('Status', 'Saved successfully.');

                },
                failure: function (form, action) {
                    if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                        Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                    }
                    if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                        Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                    }
                    if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                        Ext.Msg.alert('SERVER_INVALID', action.result.message);
                    }
                }
            });
        }
    },

    onUpdateClick: function () {
        var stdMaster = this.getStudentMasterForm();
        if (!stdMaster.isDirty()) {
            Ext.Msg.alert('Status', 'No pending changes to save.');
            return;
        }
        else if (!stdMaster.isValid()) {
            Ext.Msg.alert('Status', 'Invalid data.');
            return;
        }

        var url = '/ExampleService.svc/createstudent/';

        if (stdMaster.getForm().findField("Id").getValue() != 0) // if id is greater than 0 that means it is update request
            url = '/ExampleService.svc/createstudent/';

        if (stdMaster.isValid()) {

            // Submit the Ajax request and handle the response
            stdMaster.submit({
                url: url,
                waitMsg: 'Updating..',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                clientValidation: true,
                success: function (form, action) {
                    try {
                        var student = Ext.create('School.model.Student');
                        var resp = Ext.decode(action.response.responseText);

                        if (resp.data[0]) {
                            // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                            student.set(resp.data[0]);
                            stdMaster.loadRecord(student);
                        }

                        Ext.Msg.alert('Status', 'Saved successfully.');
                    }
                    catch (ex) {
                        Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                    }
                },
                failure: function (form, action) {
                    if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                        Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                    }
                    if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                        Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                    }
                    if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                        Ext.Msg.alert('SERVER_INVALID', action.result.message);
                    }
                }
            });
        }
    },

    onLoadClick: function () {

        var stdMaster = this.getStudentMasterForm();

        //result should contain success=true and data property otherwise it will go to failure even if there is no failure
        stdMaster.load({
            waitMsg: 'Loading...',
            url: '/ExampleService.svc/createstudent/',
            method: 'GET',
            params:
            {
                id: 1
            },
            success: function (form, action) {
                try {
                    var student = Ext.create('School.model.Student');
                    var resp = Ext.decode(action.response.responseText);

                    if (resp.data[0]) {
                        // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                        student.set(resp.data[0]);
                        stdMaster.loadRecord(student);
                    }
                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                }
            },
            failure: function (form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
        });

    },


    onDeleteClick: function () {
        //need to send whole model object to delete student instead of only id
        // so service should be written based on that

        var stdMaster = this.getStudentMasterForm();
        if (!stdMaster.getValues(false, false, false, true).Id) {
            Ext.Msg.alert('Status', 'Invalid or No data to delete.');
            return;
        }

        // Submit the Ajax request and handle the response
        stdMaster.submit({
            url: '/ExampleService.svc/createstudent/',
            clientValidation: true,
            waitMsg: 'Deleting..',
            headers:
            {
                'Content-Type': 'application/json'
            },

            success: function (form, action) {
                try {
                    var resp = Ext.decode(action.response.responseText);
                    if (resp.success)
                        stdMaster.clearForm();

                    Ext.Msg.alert('Success', resp.message);
                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                }
            },
            failure: function (form, action) {
                if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                    Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                }
                if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                    Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                }
                if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                    Ext.Msg.alert('SERVER_INVALID', action.result.message);
                }
            }
        });

    },
    onResetClick: function () {
        this.getStudentMasterForm().getForm().reset();
    },
    onClearClick: function () {
        this.getStudentMasterForm().clearForm();
    }
});