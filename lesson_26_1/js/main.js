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
      if(item.href !== 'http://127.0.0.1:5500/lesson_22_1/index.html#') {
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

  // Calculator
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcCount = document.querySelector('.calc-count'),
          calcDay = document.querySelector('.calc-day'),
          totalValue = document.getElementById('total');
    let count = 0,
        countInterval = 0;      

    const countSum = () => {
      countInterval = requestAnimationFrame(countSum);
      count++;
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;

      if(calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

      if(calcDay.value && calcDay.value < 5) dayValue *= 2;
      else if(calcDay.value && calcDay.value < 10) dayValue *= 1.5;

      if(typeValue && squareValue) total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
       

      if(total >= 0) {
        totalValue.textContent = total;
        if(count * count <= total ) {
          totalValue.textContent = count * count;
        } else {
          cancelAnimationFrame(countInterval);
          count = 0;
        }
      }
      else {
        alert('Вы ввели отрацительное значение!'); 
        totalValue.textContent = 0;
      }
    };      

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      if(target.matches('select') || target.matches('input') ) {
        countInterval = requestAnimationFrame(countSum);
      }
    });      
  };
  calc();

  // Send-ajax-form
  const sendForm = () => {
    const errorMessege = `Что-то пошло не так...`,
          statusMessage = document.createElement('div'),
          forms = document.querySelectorAll('form'),
          phoneInput = document.querySelectorAll('.form-phone');
     
    phoneInput.forEach((item) => {
      item.addEventListener('focus', () => {
        item.value = '+';
      });
      item.addEventListener('blur', () => {
        if(item.value.length === 1) item.value = '';
      });
    });

    let count = 25,
        loadIntervalBig,
        loadIntervalSmall;
    
    const loadingAnimateBig = () => {
      loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
       if(count <= 40) {
        count++;
        statusMessage.style.width = count + 'px';
       } else {
        cancelAnimationFrame(loadIntervalBig);
        loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
       }
    };
    
    const loadingAnimateSmall = () => {
      loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
       if(count >= 5) {
        count--;
        statusMessage.style.width = count + 'px';
       } else {
        cancelAnimationFrame(loadIntervalSmall);
        loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
       }
    };

    forms.forEach((item) => {
      // Валидация для инпутов
      item.addEventListener('input', (event) => {
        let target = event.target;
        if(target.placeholder === 'Ваше имя' || target.placeholder === 'Ваше сообщение') {
          if(target.value.replace(/^[а-яА-ЯёЁ\s]+/g, '')) {
            target.value = target.value.substring(0, target.value.length - 1);
          } else if(target.value.trim() === '') target.value = '';
          else return;
        } else if(target.placeholder === 'Номер телефона') { 
            if(target.value.length === 13  || target.value.slice(1).replace(/[\d]+/g, '')) {
              target.value = target.value.substring(0, target.value.length - 1);
            } else return;
          }
      });
      // Action
      item.addEventListener('submit', (event) => {
        event.preventDefault();
        statusMessage.innerHTML = '';
        statusMessage.style.cssText = ` 
          border: 2px solid #eee;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin: auto;
          margin-top: 10px;`;
        item.appendChild(statusMessage);
        loadIntervalBig = requestAnimationFrame(loadingAnimateBig);

        const formData = new FormData(item);

        postData(formData)  
          .then((output) => {
            if(output.status === 200) {
              statusMessage.innerHTML = '<img src="./images/tick.png">';
              cancelAnimationFrame(loadIntervalBig);
              cancelAnimationFrame(loadIntervalSmall);
              statusMessage.style.cssText = `margin-top: 10px;`;
            } else throw new Error('Statis network now 200');
            
          })
          .catch((error) => {
            statusMessage.textContent = errorMessege;
            cancelAnimationFrame(loadIntervalBig);
            cancelAnimationFrame(loadIntervalSmall);
            statusMessage.style.cssText = `margin-top: 10px;`;
            console.error(error);
          });

        for(let i = 0; i < item.elements.length; i++) {
          if(item.elements[i].tagName === 'INPUT') {
            item.elements[i].value = '';
          }
        }  
      });
    });   
    
    const postData = (formData) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });
    };
  };
  sendForm();
});