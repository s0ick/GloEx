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

export default togglePopup;