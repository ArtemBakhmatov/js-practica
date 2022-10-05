function modal() {
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
}

module.exports = modal;