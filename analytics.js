window.trackEvent = function(name, data = {}) {
  gtag('event', name, data);
};
trackEvent('premium_click', { item: 'msce-maths' });
trackEvent('payment_success');
trackEvent('unlock_request');

