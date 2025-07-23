document.addEventListener('DOMContentLoaded', function() {
    // Initialize the customer interface
    initCustomerInterface();
});

function initCustomerInterface() {
    // Set current year in footer
    document.getElementById('customer-year').textContent = new Date().getFullYear();

    // Load restaurant data
    loadCustomerData();

    // Initialize event listeners
    initCustomerEventListeners();
}

function loadCustomerData() {
    // Load data from shared.js
    const restaurantData = getRestaurantData();
    
    // Update restaurant name
    document.getElementById('restaurant-title').textContent = restaurantData.name;
    
    // Update copyright text
    document.getElementById('copyright-text').textContent = restaurantData.copyright + ' | By Laith Sabbah';
    
    // Update logo if exists
    if (restaurantData.logo) {
        document.getElementById('customer-logo').src = restaurantData.logo;
    }
    
    // Update background if exists
    if (restaurantData.backgroundImage) {
        document.querySelector('.restaurant-background').style.backgroundImage = `url(${restaurantData.backgroundImage})`;
    }
    
    // Load visible categories
    loadVisibleCategories();
}

function loadVisibleCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';
    
    const categories = getCategories().filter(cat => cat.visible === 'visible');
    
    if (categories.length === 0) {
        categoriesContainer.innerHTML = '<p class="no-categories">لا توجد تصنيفات متاحة حالياً.</p>';
        return;
    }
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.categoryId = category.id;
        
        categoryCard.innerHTML = `
            <img src="${category.image || '../shared/images/default-category.png'}" alt="${category.name.ar}" class="category-image">
            <div class="category-name">${category.name.ar}</div>
        `;
        
        categoryCard.addEventListener('click', function() {
            openCategoryItemsModal(category.id);
        });
        
        categoriesContainer.appendChild(categoryCard);
    });
}

function openCategoryItemsModal(categoryId) {
    const modal = document.getElementById('items-modal');
    const category = getCategoryById(categoryId);
    
    if (!category) return;
    
    // Set category name in title
    document.getElementById('category-modal-title').textContent = category.name.ar;
    
    // Load items for this category
    loadCategoryItems(categoryId);
    
    // Show modal with animation
    modal.style.display = 'block';
    document.querySelector('.modal-content').classList.add('bubble-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        document.querySelector('.modal-content').classList.remove('bubble-animation');
    }, 500);
    
    // Close modal when clicking on X
    document.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function loadCategoryItems(categoryId) {
    const itemsList = document.getElementById('customer-items-list');
    itemsList.innerHTML = '';
    
    const items = getItemsByCategory(categoryId).filter(item => item.visible === 'visible');
    const currencySymbol = getRestaurantData().currency;
    
    if (items.length === 0) {
        itemsList.innerHTML = '<p class="no-items">لا توجد أصناف متاحة في هذا التصنيف حالياً.</p>';
        return;
    }
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        
        itemCard.innerHTML = `
            <div class="item-image-container">
                <img src="${item.image || '../shared/images/default-item.png'}" alt="${item.name.ar}" class="item-image">
            </div>
            <div class="item-details">
                <h4 class="item-name">${item.name.ar}</h4>
                <div class="item-price">${item.price} ${currencySymbol}</div>
                ${item.description.ar ? `<p class="item-description">${item.description.ar}</p>` : ''}
            </div>
        `;
        
        itemsList.appendChild(itemCard);
    });
}

function initCustomerEventListeners() {
    // Language switcher
    document.getElementById('customer-lang-switch').addEventListener('click', function() {
        const currentLang = this.dataset.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        this.dataset.lang = newLang;
        this.textContent = newLang === 'ar' ? 'English' : 'العربية';
        
        // In a real app, you would implement full language switching
        alert('سيتم تطبيق ميزة التبديل بين اللغات في الإصدارات القادمة');
    });
    
    // Listen for data changes (simulated with polling in this example)
    setInterval(checkForDataUpdates, 3000);
}

function checkForDataUpdates() {
    // In a real app, you would use WebSockets or similar for real-time updates
    // Here we just reload data periodically
    loadCustomerData();
}