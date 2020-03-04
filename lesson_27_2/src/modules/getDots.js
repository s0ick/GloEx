const getDots = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
        dotslist = document.querySelector('.portfolio-dots');
  slide.forEach((item, index) => {
    let li = document.createElement('li');
    li.classList.add('dot');
    if(index === 0) li.classList.add('dot-active');
    dotslist.appendChild(li); 
  });
};

export default getDots;