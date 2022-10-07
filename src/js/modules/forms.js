import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    ////////////////////////// ОТПРАВКА ДАННЫХ НА СЕРВЕР /////////////////////////////
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
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
}

export {forms};