/**
 * @author Tiaan Swart (tiaan@cloudinit.nz)
 * @date 2018-04-06
 * @description
 *
 * CHANGE LOG
 * 2018-04-06 - Initial setup
 **/
({

    doInit: function (component, event, helper) {

        if (!helper.getIsSitePreview()) {

            // Get the UserId
            var recordId = $A.get('$SObjectType.CurrentUser.Id');

            // If we have a UserId
            if (recordId) {

                // Get the User Redirect Field Name
                var redirectIdFieldName = component.get('v.redirectIdFieldName');

                // If this is not the default
                if (redirectIdFieldName != 'Contact.AccountId') {

                    // Add it to the list of field names
                    var arrayOfFieldNames = component.get('v.recordFieldNames');
                    arrayOfFieldNames.push(redirectIdFieldName);
                    component.set('v.recordFieldNames', arrayOfFieldNames);

                }

                // Set the record Id
                component.set('v.recordId', recordId);
            }

        }

    },

    getRecord : function(component, event, helper) {

        if (!helper.getIsSitePreview()) {

            // Get the Record Id
            var recordId = component.get('v.recordId');

            if (recordId) {

                // Find the record cmp
                var recordLoader = component.find('recordLoader');

                // Set the record id
                recordLoader.set('v.recordId', recordId);

                // Reload the record
                recordLoader.reloadRecord();
            }

        }
    },

    handleRecordUpdated: function (component, event, helper) {

        if (!helper.getIsSitePreview()) {

            // Get the event that started this
            var eventParams = event.getParams();

            if (eventParams.changeType === "LOADED") {

                // Get the User Redirect Field Name
                var redirectIdFieldName = component.get('v.redirectIdFieldName');

                // Get the User Redirect Field Name
                var redirectId = component.get('v.simpleRecord.' + redirectIdFieldName);

                // If we have an Account Id
                if (redirectId) {

                    var loadRecordView = component.get('v.loadRecordView');

                    // If we have to redirect
                    if (!loadRecordView) {

                        // Navigate to the Account
                        var navEvt = $A.get('e.force:navigateToSObject');
                        navEvt.setParams({
                            'isredirect': true,
                            'recordId': redirectId
                        });
                        navEvt.fire();

                    } else {

                        // Set record id
                        component.set('v.recordViewId', redirectId);

                        // Show record view
                        component.set('v.showRecordView', true);

                        // Hide record edit
                        component.set('v.showRecordEdit', false);
                    }

                } else {

                    // Show error
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        'type': 'error',
                        'title': 'Error',
                        'message': redirectIdFieldName + ' not found!'
                    });
                    toastEvent.fire();
                }

            } else if (eventParams.changeType === "ERROR") {

                // Get the Error
                var recordError = component.get('v.recordError');

            }

        }

    },

    editRecord: function (component, event, helper) {

        // Show record edit
        component.set('v.showRecordEdit', true);
    },

    cancelEditRecord: function (component, event, helper) {

        // Hide record edit
        component.set('v.showRecordEdit', false);
    },

    saveRecord: function (component, event, helper) {

        // Save the record
        component.find("recordEdit").get("e.recordSave").fire();

        // Hide record edit
        component.set('v.showRecordEdit', false);
    }

})