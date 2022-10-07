import { tabs } from './modules/tabs';
import { modal } from './modules/modal';
import { timer } from './modules/timer';
import { cards } from './modules/cards';
import { calc } from './modules/calc';
import { forms } from './modules/forms';
import { slider } from './modules/slider';
import { openModal } from './modules/modal';

'use strict';
window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 30000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-10-13');
    cards();
    calc();
    forms('form', modalTimerId);
    slider();
});