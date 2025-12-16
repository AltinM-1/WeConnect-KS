
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      alert(`Faleminderit ${name}! Mesazhi u dërgua me sukses.`);
      form.reset();
    } else {
      alert('Ju lutem plotësoni të gjitha fushat.');
    }
  });
});