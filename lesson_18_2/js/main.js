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
    const buttonMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          buttonClose = document.querySelector('.close-btn'),
          menuItem = document.querySelectorAll('ul>li');

    const actionMenu = () => {
      menu.classList.toggle('active-menu');
    };      

    buttonMenu.addEventListener('click', actionMenu);  
    buttonClose.addEventListener('click', actionMenu);
    menuItem.forEach((item) => item.addEventListener('click',actionMenu));

  };
  toggleMenu();

  // popup
  const togglePopup = () => {

    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupButton = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

    let count = -25,
        flyInterval;  

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

    popupClose.addEventListener('click', () => {
      popup.style.display = `none`; 
    });      
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
});