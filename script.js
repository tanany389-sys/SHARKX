// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');
document.querySelectorAll('.zoomable').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});
closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal.click();
  }
});
