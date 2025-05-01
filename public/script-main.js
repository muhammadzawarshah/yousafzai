const burger_menu_icon = document.querySelector('#burger-menu-icon');
const menu = document.querySelector('#menu');

burger_menu_icon.addEventListener('click', () => {
    if(menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    }
    else{
        menu.classList.add('hidden');
    }
})