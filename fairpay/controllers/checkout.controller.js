const paypal = require('paypal-rest-sdk');

module.exports.checkout = (req, res) => {
    res.render('checkout/add-money');
};

module.exports.pay = (req, res) => {
    const create_payment_json = {
    'intent': 'sale',
    'payer': {
        'payment_method': 'paypal'
    },
    'redirect_urls': {
        'return_url': 'http://localhost:3000/succes',
        'cancel_url': 'http://localhost:3000/cancel'
    },
    'transactions': [{
        'item_list': {
            'items': [{
                'name': 'item',
                'sku': 'item',
                'price': '5.00',
                'currency': 'USD',
                'quantity': 1
            }]
        },
        'amount': {
            'currency': 'USD',
            'total': '5.00'
        },
        'description': 'This is the payment description.'
    }]
};

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                    break;
                    console.log('Create Payment Response');
                    console.log(payment);
                }
            }
        }
    });
};

module.exports.succes = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
    'payer_id': payerId,
    'transactions': [{
        'amount': {
            'currency': 'USD',
            'total': '5.00'
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
};

module.exports.cancel = (req, res) => res.send('Cancelled');
