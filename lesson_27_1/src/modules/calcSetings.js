const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
  let count = 0,
      countInterval = 0;      

  const countSum = () => {
    countInterval = requestAnimationFrame(countSum);
    count++;
    let total = 0,
        countValue = 1,
        dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

    if(calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

    if(calcDay.value && calcDay.value < 5) dayValue *= 2;
    else if(calcDay.value && calcDay.value < 10) dayValue *= 1.5;

    if(typeValue && squareValue) total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
     

    if(total >= 0) {
      totalValue.textContent = total;
      if(count * count <= total ) {
        totalValue.textContent = count * count;
      } else {
        cancelAnimationFrame(countInterval);
        count = 0;
      }
    }
    else {
      alert('Вы ввели отрацительное значение!'); 
      totalValue.textContent = 0;
    }
  };      

  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if(target.matches('select') || target.matches('input') ) {
      countInterval = requestAnimationFrame(countSum);
    }
  });      
};

export default calc;