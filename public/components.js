// Title Component
class MyTitle extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
            <title>Yousafzai Organization</title>                
        `;
    }
}
customElements.define("my-title", MyTitle);
////////////////////////////
// Header Component
class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<header class="flex items-center bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 p-5 w-full">
                <div class="ml-5">
                    <img src="/images/logo-updated.png" alt="Logo">
                </div>
                <div class="pl-4">
                    <h1 class="font-semibold text-base sm:text-2xl md:text-4xl text-red-700">Yousafzai Global Organization</h1>
                    <p class="text-[10px] sm:ml-10 md:text-sm text-gray-800 md:ml-48 italic">Empowering Communities, Preserving Heritage</p>
                </div>
            </header>`;
    }
}
customElements.define("my-header", MyHeader);

// Navbar Component
class MyNav extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<nav class="sm:p-4 bg-gradient-to-b from-red-500 via-red-700 to-red-900 text-white relative sm:sticky top-[-1px] sm:z-50 flex items-center justify-end">
                <ul class="nav-links sm:flex sm:justify-evenly sm:items-center top-[-1000px] sm:static sm:z-auto absolute z-50 w-full left-0 bg-gradient-to-b from-red-400 via-red-600 to-red-800 sm:bg-none">
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                    <a href="/index.html" class="hover:text-gray-400 duration-500">Home</a>
                    </li>
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                        <a href="/pages/about.html" class="hover:text-gray-400 duration-500">About Us</a>
                    </li>
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                        <a href="/pages/executive-members.html" class="hover:text-gray-400 duration-500">Executive Members</a>
                    </li>
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                        <a href="/pages/membership.html" class="hover:text-gray-400 duration-500">Membership</a>
                    </li>
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                        <a href="/pages/gallery.html" class="hover:text-gray-400 duration-500">Gallery</a>
                    </li>
                    <li class="sm:py-0 py-1 pl-4 sm:pl-0">
                        <a href="/pages/contact.html" class="hover:text-gray-400 duration-500">Contact Us</a>
                    </li>
                </ul>
                <div class="sm:hidden">
                <ion-icon name="menu-outline" class="menu-close-icon text-4xl cursor-pointer"></ion-icon>
                
                </div>
            </nav>`;
    }
}
customElements.define("my-nav", MyNav);
const navLinks = document.querySelector('.nav-links');
const menuCloseIcon = document.querySelector('.menu-close-icon');
menuCloseIcon.addEventListener('click', () => {
    if (menuCloseIcon.name === 'menu-outline'){
    menuCloseIcon.name = 'close-outline';
    }
    else{
        menuCloseIcon.name = 'menu-outline';
    }
    navLinks.classList.toggle('top-[30px]');  
});


//Footer Component
class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <footer>
                <div class=" bg-gradient-to-b from-red-500 via-red-700 to-red-900 p-4 text-center text-white">
                    Copyright &copy; 2025, Yousafzai Organization, All Rights Reserved
                </div>
            </footer>
        `;
    }
}
customElements.define("my-footer", MyFooter);
