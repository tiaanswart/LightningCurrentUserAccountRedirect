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

        // Get the UserId
        var recordId = $A.get('$SObjectType.CurrentUser.Id');

        // If we have a UserId
        if (recordId) {

            // Set the record Id
            component.set('v.recordId', recordId);
        }

    },

    getRecord : function(component) {

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
    },

    handleRecordUpdated: function (component, event, helper) {

        // Get the event that started this
        var eventParams = event.getParams();

        if (eventParams.changeType === "LOADED") {

            console.log("Record is loaded successfully.");

            // Get the Contact Account Id
            var contactAccountId = component.get('v.simpleRecord.Contact.AccountId');

            // If we have an Account Id
            if (contactAccountId) {

                // Navigate to the Account
                var navEvt = $A.get('e.force:navigateToSObject');
                navEvt.setParams({
                    'isredirect' : true,
                    'recordId'   : contactAccountId
                });
                navEvt.fire();

            } else {

                // Show error
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    'type'      : 'error',
                    'title'     : 'Error',
                    'message'   : 'Contact Account Id not found!'
                });
                toastEvent.fire();
            }

        } else if (eventParams.changeType === "ERROR") {

            // Get the Error
            var recordError = component.get('v.recordError');
            console.log('recordError',recordError);

        }

    }

})