document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    // Function to handle header transparency on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
            header.classList.add('transparent');
        }
    };

    // Add initial state and event listener for scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        const isMenuOpen = mobileNav.style.display === 'flex';
        mobileNav.style.display = isMenuOpen ? 'none' : 'flex';
    };

    // Add event listener for hamburger button
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.style.display = 'none';
        });
    });
});
