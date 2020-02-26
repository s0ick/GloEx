class Validator{
  // Создаём конструктор
  constructor({selector, pattern = {}, method}){
    // Форма
    this.form = document.querySelector(selector);
    // Кастомные шаблоны которые мы можем добавлять не трогая код валидатора
    this.pattern = pattern;
    // Какие поля валидируются и что к ним применяется
    this.method = method;
    // Отфильтровываем кнопки с тэгом или типом button
    this.elementsForm = [...this.form.elements].filter(item => { 
      return item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button';
    });
    // Ошибки
    this.error = new Set();
  }

  // Метод запускающий валидатор
  init(){
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.chekIt.bind(this)));
    // Кнопка не работает
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      // Если поля пустые
      this.elementsForm.forEach(elem => this.chekIt({target: elem}));
      // Не прошли валидацию
      if(this.error.size){
        e.preventDefault();
      }
    });
  }

  isValid(elem){
    const validatorMethod = {
      notEmpty(elem) {
        if(elem.value.trim() === ''){
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    // Передаётся ли какойто метод
    if(this.method){
      // Какой метод передали
      const method = this.method[elem.id];
  
      if(method){
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }      
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }

    return true;
  }

  chekIt(event){
    const target = event.target;
    // Если прошли валидацию вызываем функцию showSuccess иначе showError
    if(this.isValid(target)){
      this.showSuccess(target);
      // Удаляем ошибку
      this.error.delete(target);
    } else{
      this.showError(target);
      // Добавляем ошибку
      this.error.add(target);
    }
  } 

  // Если input не прошёл валидацию
  showError(elem){
    elem.classList.remove('success');      
    elem.classList.add('error');
    // Если класс validator-error уже есть
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
      return;
    }
    // Добавим текст с ошибкой
    const errorDiv = document.createElement('div'); 
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    // Добавим после элемента div с ошибкой
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  // Если input прошёл валидацию
  showSuccess(elem){
    elem.classList.remove('error');      
    elem.classList.add('success');
    // Проверяем есть ли у элемента что то с права
    if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
      elem.nextElementSibling.remove();
    }     
  }

  // CSS Стили для валидации
  applyStyle(){
    // Создадим элемент
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green
      }
      input.error {
        border: 2px solid red
      }
      .validator-error {
        color: red;
        font-family: sans-serif;
        font-size: 12px
      }
    `;
    // Вставим в head
    document.head.appendChild(style);
  }

  // Проверка паттернов
  setPattern(){
    if(!this.pattern.phone){
      // Паттерн по умолчанию
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if(!this.pattern.email){
      // Паттерн по умолчанию
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
      
  }
}