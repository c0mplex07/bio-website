document.addEventListener('DOMContentLoaded', function() {
  const usernameElement = document.getElementById('username');
  const cursorElement = document.getElementById('typing-cursor');
  
  const usernameVariants = [
    "c0mplex", 
    "Quang Nguyen"
  ];
  
  let currentText = '';
  let isDeleting = false;
  let textIndex = 0;
  let speed = 120;
  let pauseTime = 1500;
  
  function typeEffect() {
    const fullText = usernameVariants[textIndex];
    
    if (isDeleting) {
      currentText = fullText.substring(0, currentText.length - 1);
    } else {
      currentText = fullText.substring(0, currentText.length + 1);
    }
    
    usernameElement.textContent = currentText;
    
    let typeSpeed = speed;
    
    if (isDeleting) {
      typeSpeed = speed / 2;
    }
    
    if (!isDeleting && currentText === fullText) {
      typeSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      textIndex = (textIndex + 1) % usernameVariants.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
  }
  
  setTimeout(typeEffect, 1000);
  
  setInterval(() => {
    if (!isDeleting && currentText.length > 0) {
      cursorElement.style.transform = 'translateY(-3px)';
      setTimeout(() => {
        cursorElement.style.transform = 'translateY(0)';
      }, 50);
    }
  }, 500);
});