window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let smail = document.querySelector('#smail'),
      start = document.querySelector('#start'),
      reset = document.querySelector('#reset'),
      count = 0,
      flyIntervalRight,
      flyIntervalLeft;
  
  const flyAnimateRight = () => {
    flyIntervalRight = requestAnimationFrame(flyAnimateRight);
    count++;
    if(count * 5 < 1300) {
      smail.style.left = count * 5 + 'px';
    } else {
      cancelAnimationFrame(flyIntervalRight);
    }
  };

  const flyAnimateLeft = () => {
    flyIntervalLeft = requestAnimationFrame(flyAnimateLeft);
    count--;
    if(count * 5 > 0) {
      smail.style.left = count * 5 + 'px';
    } else {
      cancelAnimationFrame(flyIntervalLeft);
    }
  };

  let animateRight = false,
      animateLeft = false;
  start.addEventListener('click', () => {
    cancelAnimationFrame(flyIntervalLeft);
    if(animateRight) {
      flyIntervalRight = requestAnimationFrame(flyAnimateRight);
      animateRight = false;
    } else {
      animateRight = true;
      cancelAnimationFrame(flyIntervalRight);
    }
  });

  reset.addEventListener('click', () => {
    cancelAnimationFrame(flyIntervalRight);
    if(animateLeft) {
      flyIntervalLeft = requestAnimationFrame(flyAnimateLeft);
      animateLeft = false;
    } else {
      animateLeft = true;
      cancelAnimationFrame(flyIntervalLeft);
    }
  });     
});