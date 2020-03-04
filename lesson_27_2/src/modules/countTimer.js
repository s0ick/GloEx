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

export default countTimer;