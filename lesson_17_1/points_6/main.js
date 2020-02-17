'use strict';
let decCache = [],
      decCases = [2, 0, 1, 1, 1, 2]; 

const declOfNum = (number, titles) => {  
    if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
  };

const formatDate = (date) => {
  let TimesOfday = '',
      TimesDay = '',
      Times = '',
      TimesNY = '';

  if(date.getHours() < 8) TimesOfday = 'Доброй ночи';
  else if(date.getHours() < 12 && date.getHours() >= 8 ) TimesOfday ='Доброго утра';
  else if(date.getHours() >= 12 && date.getHours() < 17) TimesOfday ='Добрый день';
  else if(date.getHours() >= 17 && date.getHours() <= 23) TimesOfday ='Добрый вечер';

  let options = { weekday: 'long'};
  TimesDay = TimesDay + date.toLocaleString('ru', options);
  TimesDay = TimesDay[0].toUpperCase() + TimesDay.slice(1);

  Times = date.toLocaleTimeString('en');

  let NewYear = new Date("December 31, 2020");
  TimesNY = Math.round((NewYear.getTime() - date.getTime()) / 86400000);
  TimesNY = TimesNY + ' ' + declOfNum(TimesNY,['день', 'дня', 'дней']);

  let message = 
`${TimesOfday}
Сегодня: ${TimesDay}
Текущее время: ${Times}
До нового года осталось: ${TimesNY}.`;
  
  return message;
};

let pre = document.createElement('pre');
pre.classList.add('list');
document.body.appendChild(pre);

setInterval(function(){
  let date = new Date();
  pre.textContent = formatDate(date);
}, 1000);