const toggleMenu = () => {
  const menu = document.querySelector('menu'),
        body = document.querySelector('body');

  body.addEventListener('click', (event) => {
    let target = event.target;
    if(target.closest('.menu')){
      menu.classList.toggle('active-menu');
    }
    else if(target.classList.contains('close-btn')) {
      menu.classList.toggle('active-menu');
    }
    else if(target.matches('ul>li')) {
      event.preventDefault();
    }
    else if(target.matches('a') && !target.classList.contains('portfolio-btn')) {
      menu.classList.toggle('active-menu');
    }
    else if(!target.matches('menu')) {
      menu.classList.remove('active-menu');
    }
  });
};

export default toggleMenu;