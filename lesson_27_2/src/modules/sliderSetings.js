const getSlider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
        dots = document.querySelectorAll('.dot'),
        slider = document.querySelector('.portfolio-content');
  let currentSlider = 0,
      intervalSlider = 0;
  
  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };
  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoplay = () => {
    prevSlide(slide, currentSlider, 'portfolio-item-active');
    prevSlide(dots, currentSlider, 'dot-active');
    currentSlider++;
    if(currentSlider >= slide.length) currentSlider = 0;
    nextSlide(slide, currentSlider, 'portfolio-item-active');
    nextSlide(dots, currentSlider, 'dot-active');
  };

  const startSlide = () => {
    intervalSlider = setInterval(autoplay, 4000);
  };
  const stopSlide = () => {
    clearInterval(intervalSlider);
  };

  slider.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if(!target.matches('#arrow-right, #arrow-left, .dot')) {
      return;
    }

    prevSlide(slide, currentSlider, 'portfolio-item-active');
    prevSlide(dots, currentSlider, 'dot-active');

    if(target.matches('#arrow-right')) {
      currentSlider++;
    } else if(target.matches('#arrow-left')) {
      currentSlider--;
    } else if(target.matches('.dot')) {
      dots.forEach((item, index) => {
        if(item === target) currentSlider = index;
      });
    }

    if(currentSlider >= slide.length) currentSlider = 0;
    if(currentSlider < 0) currentSlider = slide.length -1;

    nextSlide(slide, currentSlider, 'portfolio-item-active');
    nextSlide(dots, currentSlider, 'dot-active');
  });

  slider.addEventListener('mouseover', (event) => {
   if(event.target.matches('.portfolio-btn') ||
     event.target.matches('.dot')) {
      stopSlide();
   }   
  });
  slider.addEventListener('mouseout', (event) => {
   if(event.target.matches('.portfolio-btn') ||
     event.target.matches('.dot')) {
      startSlide();
   }     
  });

  startSlide();
};

export default getSlider;