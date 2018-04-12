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

                    // Navigate to the Account
                    var navEvt = $A.get('e.force:navigateToSObject');
                    navEvt.setParams({
                        'isredirect': true,
                        'recordId': redirectId
                    });
                    navEvt.fire();

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
                console.log('recordError', recordError);

            }

        }

    }

})