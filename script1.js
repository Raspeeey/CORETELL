// Функции для работы с модальными окнами
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function submitForm(formId) {
    // Проверка на отрицательные значения для депозитов
    if (formId.includes('deposit') || formId.includes('currency')) {
      const amountInput = document.querySelector(`#${formId} input[type="number"]`);
      if (amountInput && amountInput.value <= 0) {
        alert('Сумма вклада должна быть положительной!');
        return;
      }
    }
    
    alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    document.getElementById(formId).reset();
    closeModal(formId.replace('-form', '-modal'));
  }
  
  // Фиксация хедера при скролле
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Закрытие модальных окон при клике вне контента
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });