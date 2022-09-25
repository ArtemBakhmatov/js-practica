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
});