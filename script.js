document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL: HEADER & MOBILE NAV ---
    const header = document.getElementById('site-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    // This logic only applies to the homepage header
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
        } catch (e) {
            console.error("Could not parse cart from localStorage", e);
        }
    }
    updateCartIcon(); // Update on every page load

    // --- SINGLE PRODUCT PAGE LOGIC ---
    if (document.querySelector('.product-detail-page')) {
        
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (mainImage && thumbnails) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    mainImage.src = this.src;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

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
        
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const content = item.querySelector('.accordion-content');
                const isActive = header.classList.contains('active');
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
                
                const toast = document.getElementById('toast-notification');
                toast.textContent = `✅ "${product.name}" was added to your cart.`;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            });
        }
    }

    // --- CART PAGE LOGIC ---
    if (document.querySelector('.cart-page')) {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartTotalEl = document.getElementById('cart-total');
        let cart = JSON.parse(localStorage.getItem('jane4_cart')) || [];

        function renderCart() {
            if (!cartItemsContainer) return; // Stop if container not found
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `<p id="cart-empty-message">Your cart is empty.</p>`;
                if(cartTotalEl) cartTotalEl.textContent = 'R 0.00';
                return;
            }

            let total = 0;
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-attributes">Size: ${item.size} | Colour: ${item.color}</p>
                        <p class="cart-item-price">${item.price} (Qty: ${item.quantity})</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
                
                const priceNumber = parseFloat(item.price.replace('R ', ''));
                if (!isNaN(priceNumber)) { total += priceNumber * item.quantity; }
            });
            if(cartTotalEl) cartTotalEl.textContent = `R ${total.toFixed(2)}`;
        }

        cartItemsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-item-btn')) {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('jane4_cart', JSON.stringify(cart));
                renderCart();
                updateCartIcon();
            }
        });

        const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
        if (whatsappCheckoutBtn) {
            whatsappCheckoutBtn.addEventListener('click', function() {
                if (cart.length === 0) { alert('Your cart is empty!'); return; }
                const yourPhoneNumber = '27787465300';
                let message = "Hi JANE 4, I'd like to order the following items:\n\n";
                cart.forEach(item => {
                    message += `*Product:* ${item.name}\n`;
                    message += `*Colour:* ${item.color}\n`;
                    message += `*Size:* ${item.size}\n`;
                    message += `*Quantity:* ${item.quantity}\n\n`;
                });
                message += `*Total:* ${cartTotalEl.textContent}\n\nThank you!`;
                
                const whatsappURL = `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
            });
        }
        
        renderCart();
    }
});
