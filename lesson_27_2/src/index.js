'use strict';
import countTimer from './modules/countTimer';
// Timer
let date = new Date();
date.setDate(date.getDate() + 1);
countTimer(date);

// Polyfills
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise/auto';
import elementClosest from 'element-closest';
elementClosest(window);

// Modules
import toggleMenu from './modules/toggleMenu';
import scrolling from './modules/scrolling';
import togglePopup from './modules/togglePopup';
import getTabs from './modules/getTabs';
import getDots from './modules/getDots';
import getSlider from './modules/sliderSetings';
import changeImages from './modules/changeImages';
import validateForCalc from './modules/validateForCalc';
import calc from './modules/calcSetings';
import sendForm from './modules/sendAjaxForm';
  
// Menu
toggleMenu();
// Popup
togglePopup();
// Scroll
scrolling();
// Tabs
getTabs();
// Add dots
getDots();
// Slider
getSlider();
// Change images
changeImages();
// Validation for calculator
validateForCalc();
// Calculator
calc();
// Send-ajax-form
sendForm();