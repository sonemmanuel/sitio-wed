const infoIcon = document.querySelector('.info-icon');
const info = document.getElementById('info');
const closeBtn = document.querySelector('.close-btn');
const footerContainer = document.querySelector('.footer-container');
const footerCopy = document.querySelector('.footer-copy');

infoIcon.addEventListener('click', () => {
  info.classList.toggle('active');
  infoIcon.classList.toggle('active');
  footerContainer.classList.toggle('active')
  footerCopy.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
  info.classList.remove('active');
  infoIcon.classList.remove('active');
  footerContainer.classList.remove('active');
  footerCopy.classList.remove('active');
});