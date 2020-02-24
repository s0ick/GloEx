window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // Timer
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours'),
        timetMinutes = document.querySelector('#timer-minutes'),
        timetSeconds = document.querySelector('#timer-seconds');
    
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow ) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours  = Math.floor(timeRemaining / 60 / 60);
          return {timeRemaining, hours, minutes, seconds};
    };

    const fixValue = (value) => {
      if(value < 10) value = `0${value}`;
      return value;
    };

    const getUpdateClock = () => {
      let timer = getTimeRemaining();

      timerHours.textContent = fixValue(timer.hours);
      timetMinutes.textContent = fixValue(timer.minutes);
      timetSeconds.textContent = fixValue(timer.seconds);
    };
    
    const intervalID = setInterval(() => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        getUpdateClock();
      } else {
        let dateNow = new Date();
        dateNow.setDate(date.getDate() + 1);
        countTimer(dateNow);
      }
    }, 1000);
  };
  countTimer(date);

  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
          body = document.querySelector('body');

    body.addEventListener('click', (event) => {
      let target = event.target;
      if(target.closest('.menu')) menu.classList.toggle('active-menu');
      else if(target.classList.contains('close-btn')) menu.classList.toggle('active-menu');
      else if(target.matches('ul>li')) event.preventDefault();
      else if(target.matches('a') && !target.classList.contains('portfolio-btn')) menu.classList.toggle('active-menu');
      else if(!target.matches('menu')) menu.classList.remove('active-menu');
    });
  };
  toggleMenu();

  // Popup
  const togglePopup = () => {

    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupButton = document.querySelectorAll('.popup-btn');

    let count = -25,
        flyInterval;
     
    popup.addEventListener('click', (event) => {
      let target = event.target;
      if(target.classList.contains('popup-close')) {
        popup.style.display = `none`;
      } else {
        target = target.closest('.popup-content');
        if(!target) popup.style.display = `none`;
      }
    });    

    const flyAnimate= () => {
      flyInterval = requestAnimationFrame(flyAnimate);
      count++;
      if(count * 30 < (screen.width / 2.6)) {
        popupContent.style.left = count * 30 + 'px';
      } else {
        cancelAnimationFrame(flyInterval);
        count = -25;
      }
    };          
   
    popupButton.forEach((item) => {
      item.addEventListener('click', () => {
        popup.style.display = `block`;
        if(screen.width >= 768) {
          flyInterval = requestAnimationFrame(flyAnimate);
        }
      });
    });      
  };
  togglePopup();

  // Scroll
  const scrolling = () => {
    const menuItem = document.querySelectorAll('[href^="#"]'), 
          duration = 0.4;

    menuItem.forEach((item) => {
      if(item.href !== 'http://127.0.0.1:5500/lesson_21_1/index.html#') {
        item.addEventListener('click', (e) => {
          let win = window.pageYOffset,
              hash = item.href.replace(/[^#]*(.*)/, '$1'),
              windowOffset = document.querySelector(hash).getBoundingClientRect().top,
              start = null;
          const step = (time) => {
            if (start === null) start = time;
                let progress = time - start,
                    temp = (windowOffset < 0 ? Math.max(win - progress / duration, win + windowOffset) : 
                           Math.min(win + progress/duration, win + windowOffset));
                window.scrollTo(0 , temp);
                if (temp !== win + windowOffset) requestAnimationFrame(step);
                else location.hash = hash;
          };
          requestAnimationFrame(step);
        }, false);
      }
    });

  };
  scrolling();

  // Tabs
  const getTabs = () => {
    let tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');
    
    const toggleTabContent = (index) => {
      tabContent.forEach((item, i) => {
        if(index === i) {
          tab[i].classList.add('active');
          item.classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          item.classList.add('d-none');
        }
      });
    };

    tabHeader.addEventListener('click', (event) =>{
      let target = event.target;
      target = target.closest('.service-header-tab');
      if(target.classList.contains('service-header-tab')) {
        tab.forEach((item, index) => {
          if(item === target) {
            toggleTabContent(index);
          }
        });
      }
    });    
  };
  getTabs();

  // Add dots
  const getDots = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          dotslist = document.querySelector('.portfolio-dots');
    slide.forEach((item, index) => {
      let li = document.createElement('li');
      li.classList.add('dot');
      if(index === 0) li.classList.add('dot-active');
      dotslist.appendChild(li); 
    });
  };
  getDots();

  // Slider
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
  getSlider();

  // Change images
  const changeImages = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((item) => {
      let src;
      item.addEventListener('mouseenter', (event) => {
        src = event.target.src;
        event.target.src = event.target.dataset.img;
      });
      item.addEventListener('mouseout', (event) => {
        event.target.src = src;
      });
    });
  };
  changeImages();

  // Validation for calculator
  const validateForCalc = () => {
    const calcItem = document.querySelectorAll('.calc-item');
    calcItem.forEach((item) => {
      if(!item.classList.contains('calc-type')) {
        item.addEventListener('input', (event) => {
          let target = event.target;
          target.textContent = target.toString().replace(/[^0-9]/);
        });
      }
    });
  };
  validateForCalc();

  
});