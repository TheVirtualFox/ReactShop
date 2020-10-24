import React from 'react';
import './StripeButton.scss';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HfgDHLKERpvMfKtEocvPfKyluvtBng9DD54vQCzfgpnKAQz6zTSS3Cox4V2U8yShYkiGopM535vy3sbNXykPuYB00hyIw6ftk';

    const onToken = token => {
        console.log((token));
        alert('');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}

            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;