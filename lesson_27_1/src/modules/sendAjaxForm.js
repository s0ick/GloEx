const sendForm = () => {
  const errorMessege = `Что-то пошло не так...`,
        statusMessage = document.createElement('div'),
        forms = document.querySelectorAll('form'),
        phoneInput = document.querySelectorAll('.form-phone');
   
  phoneInput.forEach((item) => {
    item.addEventListener('focus', () => {
      item.value = '+';
    });
    item.addEventListener('blur', () => {
      if(item.value.length === 1) item.value = '';
    });
  });

  let count = 25,
      loadIntervalBig,
      loadIntervalSmall;
  
  const loadingAnimateBig = () => {
    loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
     if(count <= 40) {
      count++;
      statusMessage.style.width = count + 'px';
     } else {
      cancelAnimationFrame(loadIntervalBig);
      loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
     }
  };
  
  const loadingAnimateSmall = () => {
    loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
     if(count >= 5) {
      count--;
      statusMessage.style.width = count + 'px';
     } else {
      cancelAnimationFrame(loadIntervalSmall);
      loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
     }
  };

  forms.forEach((item) => {
    // Валидация для инпутов
    item.addEventListener('input', (event) => {
      let target = event.target;
      if(target.placeholder === 'Ваше имя' || target.placeholder === 'Ваше сообщение') {
        if(target.value.replace(/^[а-яА-ЯёЁ\s]+/g, '')) {
          target.value = target.value.substring(0, target.value.length - 1);
        } else if(target.value.trim() === '') target.value = '';
        else return;
      } else if(target.placeholder === 'Номер телефона') { 
          if(target.value.length === 13  || target.value.slice(1).replace(/[\d]+/g, '')) {
            target.value = target.value.substring(0, target.value.length - 1);
          } else return;
        }
    });
    // Action
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      statusMessage.innerHTML = '';
      statusMessage.style.cssText = ` 
        border: 2px solid #eee;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: auto;
        margin-top: 10px;`;
      item.appendChild(statusMessage);
      loadIntervalBig = requestAnimationFrame(loadingAnimateBig);

      const formData = new FormData(item);

      postData(formData)  
        .then((output) => {
          if(output.status === 200) {
            statusMessage.innerHTML = '<img src="./images/tick.png">';
            cancelAnimationFrame(loadIntervalBig);
            cancelAnimationFrame(loadIntervalSmall);
            statusMessage.style.cssText = `margin-top: 10px;`;
          } else throw new Error('Statis network now 200');
          
        })
        .catch((error) => {
          statusMessage.textContent = errorMessege;
          cancelAnimationFrame(loadIntervalBig);
          cancelAnimationFrame(loadIntervalSmall);
          statusMessage.style.cssText = `margin-top: 10px;`;
          console.error(error);
        });

      for(let i = 0; i < item.elements.length; i++) {
        if(item.elements[i].tagName === 'INPUT') {
          item.elements[i].value = '';
        }
      }  
    });
  });   
  
  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
  };
};

export default sendForm;