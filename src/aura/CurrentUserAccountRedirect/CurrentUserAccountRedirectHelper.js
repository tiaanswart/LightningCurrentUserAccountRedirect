/**
 * @author Tiaan Swart (tiaan@cloudinit.nz)
 * @date 2018-04-13
 * @description
 *
 * CHANGE LOG
 * 2018-04-13 - Initial setup
 **/
({
    /**
     * https://salesforce.stackexchange.com/questions/167523/detect-community-builder-context
     * Get whether the current window is in the community builder or community site
     * preview.
     * @param  {String} url The url to check. If null, the current hostname will be
     *                        used.
     * @return {Boolean}    True if the current window is a preview.
     */
    getIsSitePreview: function() {
        var urlToCheck = window.location.hostname;
        urlToCheck = urlToCheck.toLowerCase();
        return urlToCheck.indexOf('sitepreview') >= 0 || urlToCheck.indexOf('livepreview') >= 0;
    }
})