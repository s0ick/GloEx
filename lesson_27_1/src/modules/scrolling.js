const scrolling = () => {
  const menuItem = document.querySelectorAll('[href^="#"]'), 
        duration = 0.4;

  menuItem.forEach((item) => {
    if(item.href !== 'http://127.0.0.1:5500/lesson_22_1/index.html#') {
      item.addEventListener('click', (e) => {
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
    }
  });

};

export default scrolling;