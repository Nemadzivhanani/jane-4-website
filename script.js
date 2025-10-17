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

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        const isMenuOpen = mobileNav.style.display === 'flex';
        mobileNav.style.display = isMenuOpen ? 'none' : 'flex';
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.style.display = 'none';
        });
    });

    // --- SINGLE PRODUCT PAGE LOGIC ---
    if (document.querySelector('.product-detail-page')) {
        
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        const optionContainers = document.querySelectorAll('.option-buttons');
        optionContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                if (e.target.classList.contains('option-btn')) {
                    container.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });

        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const quantityValue = document.getElementById('quantity-value');

        decreaseBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantityValue.textContent);
            if (currentQty > 1) {
                quantityValue.textContent = currentQty - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentQty + 1;
        });
    }
});
