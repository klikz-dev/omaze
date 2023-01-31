/* global ga */

// Allow for cross domain measurement
ga('require', 'linker');
ga('linker:autoLink', ['fame-stg.omaze.com']);

// Enhanced Link Attribution
ga('require', 'linkid');

// GA custom task to strip PII from pageviews.
ga(function(tracker) {
    // Add the PII patterns into this array as objects
    var piiRegex = [
        {
            name: 'EMAIL',
            regex: /.{4}@.{4}/g,
        },
    ];

    var globalSendTaskName = '_' + tracker.get('trackingId') + '_sendHitTask';

    // Fetch reference to the original sendHitTask
    var originalSendTask = window[globalSendTaskName] = window[globalSendTaskName] || tracker.get('sendHitTask');

    var i;
    var hitPayload;
    var parts;
    var val;

    // Overwrite sendHitTask with PII purger
    tracker.set('sendHitTask', function(sendModel) {
        hitPayload = sendModel.get('hitPayload').split('&');
        for (i = 0; i < hitPayload.length; i++) {
            parts = hitPayload[i].split('=');
            // Double-decode, to account for web server encode + analytics.js encode
            try {
                val = decodeURIComponent(decodeURIComponent(parts[1]));
            } catch(e) {
                val = decodeURIComponent(parts[1]);
            }
            piiRegex.forEach(function(pii) {
                val = val.replace(pii.regex, '[REDACTED ' + pii.name + ']');
            });
            parts[1] = encodeURIComponent(val);
            hitPayload[i] = parts.join('=');
        }
        sendModel.set('hitPayload', hitPayload.join('&'), true);
        originalSendTask(sendModel);
    });
});

//Checkout steps for the Checkout Behavior report in Google Analytics
var ShopifyCheckoutstep = Shopify.Checkout.step;
switch (ShopifyCheckoutstep) {
  case 'contact_information':
    ga('require', 'ec');
    ga('ec:setAction', 'checkout', {
      'step': 1,
      'option': 'contact_information',
    });
    ga('send', 'event', 'checkout', 'contact information');
      break; 
  case 'shipping_method':
    ga('require', 'ec');
    ga('ec:setAction', 'checkout', {
      'step': 2,
      'option': 'shipping_method',
    });
    ga('send', 'event', 'checkout', 'shipping method');
      break; 
  case 'payment_method':
    ga('require', 'ec');
    ga('ec:setAction', 'checkout', {
      'step': 3,
      'option': 'payment_method',
    });
    ga('send', 'event', 'checkout', 'payment');
}
