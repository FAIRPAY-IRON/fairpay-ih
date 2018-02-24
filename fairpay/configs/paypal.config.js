const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':
        'AYOJe3Q_mCetZ3CaldvxeIDkvDtqm-7c4S_j9Eay9e2gF3UKdri0jvnjUMX3co4NXWWrHyynGpgZQxWd',
    'client_secret':
        'EGZrT39MfIAaIV9M9_FevUQHW8aGWVYGrHEedYANbJip9bCtz4sP5VJx8_-Mr-mZPk38unaPm8BcTc4T'
});
