const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtns = document.querySelectorAll('.close-btn');
const modalStep1 = document.getElementById('modalStep1');
const modalStep2 = document.getElementById('modalStep2');
const modalStep3 = document.getElementById('modalStep3');
const nextStep1Btn = document.getElementById('nextStep1');
const nextStep2Btn = document.getElementById('nextStep2');
const prevStep2Btn = document.getElementById('prevStep2');
const prevStep3Btn = document.getElementById('prevStep3');
const finishProcessBtn = document.getElementById('finishProcess');
const cardOptions = document.querySelectorAll('.card-option');

let selectedCard = null;

openModalBtn.addEventListener('click', () => {
    modalStep1.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});


closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

cardOptions.forEach(option => {
    option.addEventListener('click', () => {
        cardOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedCard = option.getAttribute('data-card');
    });
});
nextStep1Btn.addEventListener('click', () => {
    if (!selectedCard) {
        alert('Пожалуйста, выберите карту');
        return;
    }
    modalStep1.style.display = 'none';
    modalStep2.style.display = 'flex';
});
prevStep2Btn.addEventListener('click', () => {
    modalStep2.style.display = 'none';
    modalStep1.style.display = 'flex';
});
nextStep2Btn.addEventListener('click', () => {
    const form = document.getElementById('userDataForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    modalStep2.style.display = 'none';
    modalStep3.style.display = 'flex';
});
prevStep3Btn.addEventListener('click', () => {
    modalStep3.style.display = 'none';
    modalStep2.style.display = 'flex';
});
finishProcessBtn.addEventListener('click', () => {
    alert('Ваша карта успешно оформлена! Менеджер свяжется с вами для уточнения деталей.');
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    document.getElementById('userDataForm').reset();
    cardOptions.forEach(opt => opt.classList.remove('selected'));
    selectedCard = null;
});
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});


const scrollBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', function () {
      const header = document.querySelector('.header');
      header.classList.toggle('scrolled', window.scrollY > 50);
    });

    let currentSlide = 0;
    const slideContainer = document.getElementById('slideContainer');
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');

    function goToSlide(index) {
      currentSlide = index;
      const offset = index * 100;
      slideContainer.style.transform = `translateX(-${offset}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      testimonials.forEach((el, i) => {
        el.classList.remove('visible');
        if (i >= index * 2 && i < index * 2 + 2) {
          setTimeout(() => el.classList.add('visible'), 100);
        }
      });
    }
    

    document.addEventListener('DOMContentLoaded', function() {
        const openBtn = document.getElementById('openReviewBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        const modal = document.getElementById('modalOverlay');
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating');
        const ratingValue = document.getElementById('ratingValue');
        const form = document.getElementById('reviewForm');
        const successMessage = document.getElementById('successMessage');
        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                resetForm();
            }
        });
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                ratingValue.textContent = `${rating}/5`;
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            if (!form.name.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }
            if (ratingInput.value === '0') {
                document.getElementById('ratingError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('ratingError').style.display = 'none';
            }
            if (!form.message.value.trim()) {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('messageError').style.display = 'none';
            }
            if (isValid) {
                console.log('Отзыв отправлен:', {
                    name: form.name.value,
                    email: form.email.value,
                    rating: ratingInput.value,
                    reviewType: form.reviewType.value,
                    message: form.message.value
                });
                form.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    resetForm();
                }, 3000);
            }
        });

        function resetForm() {
            form.reset();
            form.style.display = 'flex';
            successMessage.style.display = 'none';
            stars.forEach(s => s.classList.remove('active'));
            ratingInput.value = '0';
            ratingValue.textContent = '0/5';
            document.querySelectorAll('.error').forEach(el => {
                el.style.display = 'none';
            });
        }
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const readMoreBtn = document.getElementById('readMoreBtn');
        const aboutBankModal = document.getElementById('aboutBankModal');
        const closeAboutBankBtns = document.querySelectorAll('#closeAboutBankBtn, #closeAboutBankBtn2');
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            aboutBankModal.style.display = 'flex';
        });
        closeAboutBankBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                aboutBankModal.style.display = 'none';
            });
        });
        window.addEventListener('click', function(e) {
            if (e.target === aboutBankModal) {
                aboutBankModal.style.display = 'none';
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const subscribeForm = document.querySelector('.subscribe-form');
        const subscribeBtn = document.querySelector('.btnsub');
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!emailInput.value.includes('@')) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            subscribeBtn.innerHTML = '<i class="fas fa-check"></i> Подписка оформлена';
            subscribeBtn.style.backgroundColor = '#4BB543'; 
            subscribeBtn.classList.add('success-animation');
            setTimeout(function() {
                subscribeBtn.innerHTML = 'Подписаться';
                subscribeBtn.style.backgroundColor = '';
                subscribeBtn.classList.remove('success-animation');
                emailInput.value = ''; 
            }, 3000);
            console.log('Email подписчика:', emailInput.value);
        });
    });

    document.getElementById('footerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Вопрос отправлен!');
        document.getElementById('footerPhone').value = '';
        document.getElementById('footerQuestion').value = '';
    });