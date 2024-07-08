const slider = {
  initSlider(sliderContainer, prevButton, nextButton, boxes) {
    function calculateVisibleBoxes() {
      const width = window.innerWidth;
      if (width >= 900) {
        return 3;
      }
      if (width >= 600) {
        return 2;
      }
      return 1.5; // 1.5 slides on small screens
    }
    let visibleBoxes = calculateVisibleBoxes();
    const totalBoxes = boxes.length;
    let currentIndex = 0;
    // Calculate the number of visible boxes based on the window width

    const updateSlider = () => {
      const boxWidth = boxes[0].offsetWidth;
      const offset = -currentIndex * boxWidth;
      sliderContainer.style.transform = `translateX(${offset}px)`;
    };

    prevButton.addEventListener('click', () => {
      nextButton.classList.remove('hide');
      currentIndex = currentIndex > 0 ? currentIndex - 3 : totalBoxes - visibleBoxes;
      if (currentIndex >= 0) prevButton.classList.add('hide');

      updateSlider();
    });

    nextButton.addEventListener('click', () => {
      prevButton.classList.remove('hide');
      currentIndex = currentIndex < totalBoxes - visibleBoxes ? currentIndex + 3 : 0;
      if (currentIndex >= totalBoxes - 3) nextButton.classList.add('hide');

      updateSlider();
    });
    // Ensure slider adjusts on window resize
    window.addEventListener('resize', () => {
      visibleBoxes = calculateVisibleBoxes();
      sliderContainer.style.transition = 'none';
      updateSlider();
      setTimeout(() => {
        sliderContainer.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
    });

    // Swipe functionality
    let startX;
    let startY;
    let endX;
    let endY;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
      endY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const diffX = startX - endX;
      const diffY = startY - endY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 50) {
          // Swiped left
          currentIndex = currentIndex < totalBoxes - visibleBoxes ? currentIndex + 1 : 0;
          if (currentIndex >= totalBoxes - 2) currentIndex = totalBoxes - 1;
        } else if (diffX < -50) {
          // Swiped right
          currentIndex = currentIndex > 0 ? currentIndex - 1 : totalBoxes - visibleBoxes;
          if (currentIndex === 0) currentIndex = 0;
        }

        updateSlider();
      }
    };

    sliderContainer.addEventListener('touchstart', handleTouchStart);
    sliderContainer.addEventListener('touchmove', handleTouchMove);
    sliderContainer.addEventListener('touchend', handleTouchEnd);

    // Initialize slider
    updateSlider();
  },
};

export default slider;
