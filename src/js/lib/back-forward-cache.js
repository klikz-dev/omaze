/*
    NOTE: If browser back button was used, flush cache
          This ensures that user will always see an accurate, up-to-date view based on their state
          https://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
    SEE:  https://gomakethings.com/fixing-safaris-back-button-browser-cache-issue-with-vanilla-js/
*/
/*
    "Your problem is caused by back-forward cache. It is supposed to save complete state of page when user navigates away. When user navigates back with back button page can be loaded from cache very quickly. This is different from normal cache which only caches HTML code.

    When page is loaded for bfcache onload event wont be triggered. Instead you can check the persisted property of the onpageshow event. It is set to false on initial page load. When page is loaded from bfcache it is set to true."
*/
(function() {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();
