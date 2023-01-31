/**
 *  NOTE: dynamic pricing set by entries rather than dollar amount,
 *  so we can ensure that currency conversion works without issue, e.g.,
 *      'entries of item in cart': 'cross sell entries to display'
 *
 *  GIVEN mapping: 'XX': 'YY'
 *      FOR XX entries in cart
 *      CROSS SELL YY entries
 */

 export default {
    '20': '20',
    '125': '20',
    '500': '20',
    '1200': '125',
    '2000': '500',
};
