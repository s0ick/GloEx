const scrolling = () => {
  document.body.addEventListener('click', (event) => {
    let target = event.target;
    if(target.tagName === 'A') {
      event.preventDefault();
      let link = '/index.html#';
      if(location.origin === 'http://localhost:8080/') {
        link = '#';
      }
      if(target.href !== location.origin + link && 
        target.href !== location.origin + '/#close') {
        const blockID = target.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
};

export default scrolling;
