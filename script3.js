document.addEventListener('DOMContentLoaded', function() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    const initialReviews = [
      {
        author: "Александр К.",
        rating: 5,
        text: "Пользуясь услугами CORETELL уже более года. Отличный сервис, быстрые переводы и приятный кэшбэк. Особенно радует персональный менеджер, который всегда на связи и готов помочь.",
        date: getCurrentDate(-12) 
      },
      {
        author: "Елена С.",
        rating: 4,
        text: "Оформила ипотеку в CORETELL по выгодной ставке. Процесс оформления занял всего 2 дня, все документы подготовили за меня. Единственное - мобильное приложение иногда подвисает.",
        date: getCurrentDate(-11) 
      },
      {
        author: "Михаил П.",
        rating: 5,
        text: "Лучший банк для бизнеса! Открыл расчетный счет за 15 минут, международные платежи проходят мгновенно. Комиссии ниже, чем у конкурентов. Рекомендую всем предпринимателям.",
        date: getCurrentDate(-9) 
      },
      {
        author: "Ольга В.",
        rating: 5,
        text: "Премиальная карта Black полностью оправдывает свою стоимость. Доступ в бизнес-залы аэропортов, консьерж-сервис и повышенный кэшбэк делают путешествия еще приятнее.",
        date: getCurrentDate(-6) 
      },
      {
        author: "Дмитрий Р.",
        rating: 3,
        text: "Хороший банк, но есть куда расти. Некоторые операции в мобильном приложении неочевидны. Зато служба поддержки работает оперативно - проблему с картой решили за 10 минут.",
        date: getCurrentDate(-5) 
      },
      {
        author: "Анна М.",
        rating: 5,
        text: "Открыла вклад под 8.5% - лучшие условия на рынке. Интерфейс личного кабинета интуитивно понятный, все необходимые функции под рукой. Буду рекомендовать знакомым.",
        date: getCurrentDate(-1) 
      }
    ];
    function getCurrentDate(daysOffset = 0) {
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      
      const day = date.getDate();
      const month = date.toLocaleString('ru', { month: 'long' });
      const year = date.getFullYear();
      
      // Добавляем правильное окончание для дня
      let daySuffix;
      if (day % 10 === 1 && day !== 11) {
        daySuffix = '';
      } else if ([2, 3, 4].includes(day % 10) && ![12, 13, 14].includes(day)) {
        daySuffix = 'а';
      } else {
        daySuffix = 'ов';
      }
      
      return `${day}${daySuffix} ${month} ${year}`;
    }

    // Функция для создания HTML отзыва
    function createReviewHTML(review) {
      return `
        <div class="review-card">
          <div class="review-header">
            <div class="review-author">${review.author}</div>
            <div class="review-date">${review.date}</div>
          </div>
          <div class="review-rating">
            ${'<i class="fas fa-star active"></i>'.repeat(review.rating)}
            ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
          </div>
          <div class="review-text">
            ${review.text}
          </div>
        </div>
      `;
    }

    // Загрузка начальных отзывов
    initialReviews.forEach((review, index) => {
      // Добавляем небольшую задержку для анимации
      setTimeout(() => {
        reviewsGrid.insertAdjacentHTML('beforeend', createReviewHTML(review));
      }, index * 100);
    });

    // Слайдер
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
    }
    
    // Автопереключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Обработчики событий
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-index'));
        updateSlider();
        resetInterval();
      });
    });
    
    // Управление рейтингом
    const stars = document.querySelectorAll('.rating-star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        ratingInput.value = rating;
        
        stars.forEach((s, index) => {
          if (index < rating) {
            s.innerHTML = '<i class="fas fa-star"></i>';
            s.classList.add('active');
          } else {
            s.innerHTML = '<i class="far fa-star"></i>';
            s.classList.remove('active');
          }
        });
      });
    });
    
    // Открытие модального окна
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const moderationNotice = document.getElementById('moderationNotice');
    
    addReviewBtn.addEventListener('click', function(e) {
      e.preventDefault();
      reviewModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    
    closeReviewModal.addEventListener('click', function() {
      reviewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
      if (e.target === reviewModal) {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Отправка формы
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (ratingInput.value === '0') {
        alert('Пожалуйста, поставьте оценку');
        return;
      }
      
      // Показываем уведомление о модерации
      moderationNotice.classList.add('show');
      
      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        moderationNotice.classList.remove('show');
      }, 5000);
      
      // Создаем новый отзыв (будет добавлен после "модерации")
      const newReview = {
        author: document.getElementById('reviewName').value,
        rating: parseInt(ratingInput.value),
        text: document.getElementById('reviewText').value,
        date: getCurrentDate(0) // Текущая дата
      };
      
      // "Модерация" - добавляем отзыв через 3 секунды
      setTimeout(() => {
        const reviewHTML = createReviewHTML(newReview);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = reviewHTML;
        const newReviewElement = tempDiv.firstChild;
        
        // Добавляем с анимацией
        newReviewElement.style.opacity = '0';
        newReviewElement.style.transform = 'translateY(20px)';
        reviewsGrid.prepend(newReviewElement);
        
        // Запускаем анимацию
        setTimeout(() => {
          newReviewElement.style.opacity = '1';
          newReviewElement.style.transform = 'translateY(0)';
        }, 10);
      }, 3000);
      
      // Очищаем форму
      reviewForm.reset();
      
      // Сброс рейтинга
      stars.forEach(star => {
        star.innerHTML = '<i class="far fa-star"></i>';
        star.classList.remove('active');
      });
      ratingInput.value = '0';
      
      // Закрываем модальное окно
      reviewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Фиксация хедера при скролле
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  });