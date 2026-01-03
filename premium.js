/* ==========================
   PREMIUM ACCESS REQUEST (REFINED)
========================== */

function handlePremiumRequest(btn) {
  const item = btn.dataset.item || 'Premium Content';

  const message = `
Hello Browns Knowledge Hub,
I have paid for: ${item}
Please confirm and unlock.
`;

  // Open WhatsApp with encoded message
  window.open(
    `https://wa.me/265993812391?text=${encodeURIComponent(message)}`,
    '_blank'
  );

  alert(
    "Thank you! After admin confirmation, this content will be unlocked."
  );
}

/* Attach listeners safely */
document.querySelectorAll('.locked-btn').forEach(btn => {
  btn.addEventListener('click', () => handlePremiumRequest(btn));
});