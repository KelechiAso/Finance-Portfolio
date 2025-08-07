document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainHeader = document.getElementById('main-header');
    
    let lastScrollY = window.scrollY;

    // Dynamic header behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY < lastScrollY) {
            // Scrolling up
            mainHeader.style.transform = 'translateY(0)';
        } else {
            // Scrolling down
            mainHeader.style.transform = 'translateY(-100%)';
        }
        lastScrollY = window.scrollY;
    });


    // Mobile menu toggle
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
