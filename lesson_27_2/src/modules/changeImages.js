const changeImages = () => {
  const commandPhoto = document.querySelectorAll('.command__photo');
  commandPhoto.forEach((item) => {
    let src;
    item.addEventListener('mouseenter', (event) => {
      src = event.target.src;
      event.target.src = event.target.dataset.img;
    });
    item.addEventListener('mouseout', (event) => {
      event.target.src = src;
    });
  });
};

export default changeImages;