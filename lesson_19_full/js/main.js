window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // Таймер
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

  // Меню
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

  // popup
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
      item.addEventListener('click', (e) => {
        e.preventDefault(); 
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
    });

  };
  scrolling();

  //Tabs
  const tabs = () => {
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
  tabs();
});
