function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    ////////////////////////// ТАБЫ /////////////////////////////
    const tabs = document.querySelectorAll(tabsSelector),                   // все табы 
          tabsContent = document.querySelectorAll(tabsContentSelector),     // весь контент
          tabsWrapper = document.querySelector(tabsParentSelector);         // обёртка всех табов

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export {tabs};