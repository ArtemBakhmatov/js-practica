'use strict';

window.addEventListener('DOMContentLoaded', () => {
    ////////////////////////// ТАБЫ /////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),       // все табы 
          tabsContent = document.querySelectorAll('.tabcontent'),     // весь контент
          tabsWrapper = document.querySelector('.tabheader__items');  // обёртка всех табов

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    ////////////////////////// ТАЙМЕР /////////////////////////////
    const deadline = '2022-10-13';  // время в будущем

    function getTimerRemaining(endtime) { // получить оставшийся таймер (разница между deadline и наст. время)
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // разница в миллисикундах

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }
           
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {    // установить ноль
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {  // Установить время на нашей странице
        const timer = document.querySelector(selector), // обёртка всего таймера
               days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
       timeInterval = setInterval(upDateClock, 1000);

       upDateClock(); // запускаем чтобы сработал сразу, а не через одну секунду

        function upDateClock() {  // обновление часов через каждую секунду
            const t = getTimerRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    ////////////////////////// МОДАЛЬНОЕ ОКНО /////////////////////////////
    const modalTrigger = document.querySelectorAll('[data-modal]'),  // кнопки
                 modal = document.querySelector('.modal');           // модальное окно

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    }); 

    ////////////////////////// МОДИФИКАЦИИ МОДАЛЬНОГО ОКНА /////////////////////////////

    //const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
        // скролл + окно браузера >= весь скролл // -1 -> добавили чтобы не было багов на др. мониторах
    }

    window.addEventListener('scroll', showModalByScroll);

    ////////////////////////// КАРТОЧКИ ТОВАРОВ (Class ES6) /////////////////////////////

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const div = document.createElement('div');

            if(this.classes.length === 0) {      // проверка если не добавили класс при вызове объекта
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            
            div.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    const getResourse = async (url) => {  // async -> асинхронный код
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); 
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

        // Второй вариант решения
    /* getResourse('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const div = document.createElement('div');
            div.classList.add('menu__item');
            div.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(div);
        });
    }
 */
    ////////////////////////// ОТПРАВКА ДАННЫХ НА СЕРВЕР /////////////////////////////
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {  // async -> асинхронный код
        const res = await fetch(url, {       // await -> дождаться результата этого запроса
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json(); 
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // entries() -> превращает в массив массивов ([['a', 5]])
            // Object.fromEntries() -> превращает в объект {a: 5}

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',                         // метод
        body: JSON.stringify({name: 'Alex'}),   // что отправляем
        Headers: {                              // заголовок
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json()) // response -> ответ в json // response.json()) -> переводит в объект
    .then(json => console.log(json));  // объект выводится в консоли

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    ////////////////////////// СЛАЙДЕР (карусель) /////////////////////////////
    
    const slides = document.querySelectorAll('.offer__slide'),      // все слайды
          slider = document.querySelector('.offer__slider'),        // один слайд
            prev = document.querySelector('.offer__slider-prev'),   // стрелка назад
            next = document.querySelector('.offer__slider-next'),   // стрелка вперед
           total = document.querySelector('#total'),
         current = document.querySelector('#current'),
   slidesWrapper = document.querySelector('.offer__slider-wrapper'),// обертка всех слайдов
     slidesField = document.querySelector('.offer__slider-inner'),  // горез-е поле для слайдов
           width = window.getComputedStyle(slidesWrapper).width;    // ширина обертки
    let slideIndex = 1;
    let offset = 0;

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
                dots = [];

    indicators.classList.add('carousel-indicators');
    
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if(i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function setOpacityDot() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        setOpacityDot();
        
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        setOpacityDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            setOpacityDot();
        });
    });

    ////////////////////////// КАЛЬКУЛЯТОР /////////////////////////////
    
    const result = document.querySelector('.calculating__result span'); // сюда будет приходить ответ
    let sex = 'female', 
        height, 
        weight, 
        age, 
        ratio = 1.375;

    function calcTotal() {  // получить конечный результат
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '*** ';
            return; // досрочно прервать, для того чтобы код продолжил работать внизу
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 *weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {  // получить статическую информацию
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if(event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                } else {
                    sex = event.target.getAttribute('id');
                }
                console.log(`Активность: ${ratio}, Пол ${sex}`);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                event.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');  //#gender -> пол
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active'); 
    //.calculating__choose_big -> физическая активность 

    function getDynamicInformation(selector) { // заполняем инпуты
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');


});