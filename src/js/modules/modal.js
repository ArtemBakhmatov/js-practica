function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    ////////////////////////// МОДАЛЬНОЕ ОКНО /////////////////////////////
    const modalTrigger = document.querySelectorAll(triggerSelector),      // кнопки
                 modal = document.querySelector(modalSelector);           // модальное окно

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });
    

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    }); 

    ////////////////////////// МОДИФИКАЦИИ МОДАЛЬНОГО ОКНА /////////////////////////////

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
        // скролл + окно браузера >= весь скролл // -1 -> добавили чтобы не было багов на др. мониторах
    }

    window.addEventListener('scroll', showModalByScroll);
}

export {modal};
export {openModal};
export {closeModal};