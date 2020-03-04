const validateForCalc = () => {
  const calcItem = document.querySelectorAll('.calc-item');
  calcItem.forEach((item) => {
    if(!item.classList.contains('calc-type')) {
      item.addEventListener('input', (event) => {
        let target = event.target;
        target.textContent = target.toString().replace(/[^0-9]/);
      });
    }
  });
};

export default validateForCalc;