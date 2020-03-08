const validateForCalc = () => {
  const calcBlock = document.querySelector('.calc-block');
  
  calcBlock.addEventListener('input', event => {
    let target = event.target;
    if(!target.classList.contains('calc-type')) {
    target.textContent = target.toString().replace(/[^0-9]/);
    }
  });
};

export default validateForCalc;