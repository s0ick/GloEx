const changeImages = () => {
  const command = document.querySelector('.command');
  let src;
  command.addEventListener('mouseover', (event) => {
    let target = event.target;
    if(target.tagName === 'IMG') {
      src = event.target.src;
      event.target.src = event.target.dataset.img;
    }    
  });
  command.addEventListener('mouseout', (event) => {
    let target = event.target;
    if(target.tagName === 'IMG') {
      event.target.src = src;
    }    
  });
};

export default changeImages;