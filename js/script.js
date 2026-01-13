document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFill = document.getElementById('progress-fill');

    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    let currentSlide = slideParam ? parseInt(slideParam, 10) : 0;
    const totalSlides = slides.length;

    // Initialize state
    updateSlideState();

    function updateSlideState() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update progress bar
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;

        // Update buttons state
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
    }

    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlideState();
        }
    }

    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlideState();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Touch support (basic swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToNextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            goToPrevSlide();
        }
    }
});
