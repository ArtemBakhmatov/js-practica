function forms() {
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

    ////////////// МОДАЛЬНОЕ ОКНО (cкопировали из файла modal.js) /////////////////
    const modal = document.querySelector('.modal');           // модальное окно

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
}

module.exports = forms;