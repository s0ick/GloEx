const sendForm = () => {
  const errorMessege = `Что-то пошло не так...`,
        statusMessage = document.createElement('div'),
        phoneInput = document.querySelector('#form1-phone');

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

  document.body.addEventListener('click', (event) => {
    let target = event.target;
    if(target.placeholder === 'Номер телефона') {
      target.value = '+';
    }
  });
  // Валидация для инпутов
  document.body.addEventListener('input', (event) => {
    let target = event.target;
      if(target.placeholder === 'Ваше имя' || target.placeholder === 'Ваше сообщение') {
        while(target.value.replace(/^[а-яА-ЯёЁ\s]+/g, '')) {
          target.value = target.value.substring(0, target.value.length - 1);
        } if(target.value.trim() === '') target.value = '';
      } else if(target.placeholder === 'Номер телефона') {
          while(target.value.length === 13  || target.value.slice(1).replace(/[\d]+/g, '')) {
            target.value = target.value.substring(0, target.value.length - 1);
          }
      }
  });

  // Action
  document.body.addEventListener('submit', (event) => {
    let target = event.target;
    event.preventDefault();
      statusMessage.innerHTML = '';
      statusMessage.style.cssText = ` 
        border: 2px solid #eee;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: auto;
        margin-top: 10px;`;
      target.appendChild(statusMessage);
      loadIntervalBig = requestAnimationFrame(loadingAnimateBig);

      const formData = new FormData(target);
      let body = {};
      formData.forEach((value, key) => body[key] = value);
      
      postData(body)  
        .then((output) => {
          if(output.status === 200) {
            statusMessage.innerHTML = '<img src="./images/tick.png">';
            cancelAnimationFrame(loadIntervalBig);
            cancelAnimationFrame(loadIntervalSmall);
            statusMessage.style.cssText = `margin-top: 10px;`;
            setTimeout(() => {
              statusMessage.innerHTML = '';
            }, 3000);
          } else throw new Error('Statis network now 200');
          
        })
        .catch((error) => {
          statusMessage.textContent = errorMessege;
          cancelAnimationFrame(loadIntervalBig);
          cancelAnimationFrame(loadIntervalSmall);
          statusMessage.style.cssText = `margin-top: 10px;`;
          setTimeout(() => {
            statusMessage.innerHTML = '';
          }, 3000);
          console.error(error);
        });

      for(let i = 0; i < target.elements.length; i++) {
        if(target.elements[i].tagName === 'INPUT') {
          target.elements[i].value = '';
        }
      }  
  });
  
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
};

export default sendForm;