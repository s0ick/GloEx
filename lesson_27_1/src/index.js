'use strict';

import countTimer from './modules/countTimer';
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
  
// Timer
let date = new Date();
date.setDate(date.getDate() + 1);
countTimer(date);

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