document.addEventListener('DOMContentLoaded', function() {
    // Фиксация хедера при скролле
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Пагинация
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageLinks = document.querySelectorAll('.page-numbers a');
    let currentPage = 1;
    
    // Переключение страниц
    function showPage(pageNumber) {
      document.querySelectorAll('.news-page').forEach(page => {
        page.style.display = 'none';
      });
      document.getElementById('page' + pageNumber).style.display = 'block';
      currentPage = pageNumber;
      
      // Обновление активной кнопки
      pageLinks.forEach(link => {
        link.classList.remove('active');
        if (parseInt(link.dataset.page) === pageNumber) {
          link.classList.add('active');
        }
      });
      
      // Обновление состояния кнопок "назад/вперед"
      prevBtn.classList.toggle('disabled', pageNumber === 1);
      nextBtn.classList.toggle('disabled', pageNumber === pageLinks.length);
    }
    
    // Обработчики для кнопок пагинации
    pageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(parseInt(this.dataset.page));
      });
    });
    
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
    
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < pageLinks.length) {
        showPage(currentPage + 1);
      }
    });
    
    // Анимация карточек при загрузке
    const cards = document.querySelectorAll('.news-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    });
  });