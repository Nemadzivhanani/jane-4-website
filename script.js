document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL: HEADER & MOBILE NAV ---
    const header = document.getElementById('site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (header && !header.classList.contains('header-solid')) {
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
    }

    if (hamburgerBtn && mobileNav) {
        const toggleMenu = () => {
            const isMenuOpen = mobileNav.style.display === 'flex';
            mobileNav.style.display = isMenuOpen ? 'none' : 'flex';
        };
        hamburgerBtn.addEventListener('click', toggleMenu);

        mobileNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
            });
        });
    }

    // --- GLOBAL: CART ICON UPDATE ---
    function updateCartIcon() {
        try {
            const cart = JSON.parse(localStorage.getItem('jane4_cart')) || [];
            const cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                cartBadge.textContent = cart.length;
            }
        } catch (e) { console.error("Could not parse cart from localStorage", e); }
    }
    updateCartIcon();

    // --- SINGLE PRODUCT PAGE LOGIC ---
    if (document.querySelector('.product-detail-page')) {
        
        // Image Gallery
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Option Button Selection
        const optionContainers = document.querySelectorAll('.option-buttons');
        optionContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                if (e.target.classList.contains('option-btn')) {
                    container.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });

        // Quantity Selector
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const quantityValue = document.getElementById('quantity-value');
        if (decreaseBtn && increaseBtn && quantityValue) {
            decreaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantityValue.textContent);
                if (currentQty > 1) { quantityValue.textContent = currentQty - 1; }
            });
            increaseBtn.addEventListener('click', () => {
                let currentQty = parseInt(quantityValue.textContent);
                quantityValue.textContent = currentQty + 1;
            });
        }

        // NEW: Accordion Logic
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const content = item.querySelector('.accordion-content');
                const isActive = header.classList.contains('active');

                // Close other accordions when one is opened
                accordionItems.forEach(otherItem => {
                    otherItem.querySelector('.accordion-header').classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                });

                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        // "ORDER ON WHATSAPP" (Single Item)
        const orderBtn = document.getElementById('order-btn');
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const yourPhoneNumber = '27787465300';
                const productName = document.querySelector('.product-title').textContent.trim();
                const selectedColor = document.querySelector('#color-options .option-btn.active').textContent.trim();
                const selectedSize = document.querySelector('#size-options .option-btn.active').textContent.trim();
                const quantity = document.getElementById('quantity-value').textContent.trim();
                const message = `Hi JANE 4, I'd like to place an order:\n\n*Product:* ${productName}\n*Colour:* ${selectedColor}\n*Size:* ${selectedSize}\n*Quantity:* ${quantity}\n\nThank you!`;
                const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            });
        }
        
        // UPDATED: "ADD TO CART" with Toast Notification
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const product = {
                    id: Date.now(),
                    name: document.querySelector('.product-title').textContent.trim(),
                    price: document.querySelector('.product-price').textContent.trim(),
                    color: document.querySelector('#color-options .option-btn.active').textContent.trim(),
                    size: document.querySelector('#size-options .option-btn.active').textContent.trim(),
                    quantity: parseInt(document.getElementById('quantity-value').textContent.trim()),
                    image: document.getElementById('main-product-image').src
                };
                let cart = JSON.parse(localStorage.getItem('jane4_cart')) || [];
                cart.push(product);
                localStorage.setItem('jane4_cart', JSON.stringify(cart));
                updateCartIcon();
                
                // Show custom toast notification instead of alert
                const toast = document.getElementById('toast-notification');
                toast.textContent = `✅ "${product.name}" was added to your cart.`;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000); // Hide after 3 seconds
            });
        }
    }

    // --- CART PAGE LOGIC ---
    if (document.querySelector('.cart-page')) {
        // ... (The rest of the cart logic remains the same)
    }
});
