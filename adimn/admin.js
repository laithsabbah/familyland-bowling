document.addEventListener('DOMContentLoaded', function() {
    // Initialize the admin panel
    initAdminPanel();
});

function initAdminPanel() {
    // Set current year in footer
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Load restaurant data
    loadRestaurantData();

    // Initialize sections
    initSections();

    // Initialize category sorting
    initSortableCategories();

    // Initialize event listeners
    initEventListeners();
}

function loadRestaurantData() {
    // Load data from shared.js
    const restaurantData = getRestaurantData();
    
    // Update restaurant name
    document.getElementById('restaurant-name').value = restaurantData.name;
    
    // Update copyright text
    document.getElementById('copyright-text').value = restaurantData.copyright;
    
    // Update currency symbol
    document.getElementById('currency-symbol').value = restaurantData.currency;
    document.querySelectorAll('.currency-symbol').forEach(el => {
        el.textContent = restaurantData.currency;
    });
    
    // Update logo if exists
    if (restaurantData.logo) {
        document.getElementById('restaurant-logo').src = restaurantData.logo;
    }
    
    // Update background if exists
    if (restaurantData.backgroundImage) {
        document.getElementById('background-preview').style.backgroundImage = `url(${restaurantData.backgroundImage})`;
        document.getElementById('background-preview').textContent = '';
    }
    
    // Load categories
    loadCategories();
}

function initSections() {
    const sections = document.querySelectorAll('.admin-content section');
    const navLinks = document.querySelectorAll('.admin-sidebar nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked link and corresponding section
            this.parentElement.classList.add('active');
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.classList.add('active-section');
        });
    });
}

function initSortableCategories() {
    const categoriesList = document.getElementById('categories-list');
    
    new Sortable(categoriesList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function() {
            // Get new order of categories
            const newOrder = Array.from(categoriesList.children).map((el, index) => {
                return {
                    id: el.dataset.categoryId,
                    order: index
                };
            });
            
            // Update order in data
            updateCategoriesOrder(newOrder);
        }
    });
}

function loadCategories() {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = '';
    
    const categories = getCategories();
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.categoryId = category.id;
        
        categoryCard.innerHTML = `
            <img src="${category.image || '../shared/images/default-category.png'}" alt="${category.name.ar}" class="category-image">
            <div class="category-info">
                <div class="category-name">${category.name.ar} / ${category.name.en}</div>
                <span class="category-status ${category.visible === 'visible' ? 'status-visible' : 'status-hidden'}">
                    ${category.visible === 'visible' ? 'ظاهر' : 'مخفي'}
                </span>
            </div>
            <div class="category-actions">
                <button class="btn btn-primary btn-sm edit-category-btn" data-id="${category.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-secondary btn-sm manage-items-btn" data-id="${category.id}">
                    <i class="fas fa-utensils"></i>
                </button>
                <button class="btn ${category.visible === 'visible' ? 'btn-danger' : 'btn-success'} btn-sm toggle-visibility-btn" data-id="${category.id}">
                    <i class="fas ${category.visible === 'visible' ? 'fa-eye-slash' : 'fa-eye'}"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-category-btn" data-id="${category.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        categoriesList.appendChild(categoryCard);
    });
    
    // Add event listeners to category buttons
    document.querySelectorAll('.edit-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            openEditCategoryModal(categoryId);
        });
    });
    
    document.querySelectorAll('.manage-items-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            openManageItemsModal(categoryId);
        });
    });
    
    document.querySelectorAll('.toggle-visibility-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            toggleCategoryVisibility(categoryId);
        });
    });
    
    document.querySelectorAll('.delete-category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryId = this.dataset.id;
            deleteCategory(categoryId);
        });
    });
}

function openAddCategoryModal() {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    const title = document.getElementById('modal-title');
    
    // Reset form
    form.reset();
    document.getElementById('category-image-preview').innerHTML = '';
    document.getElementById('category-id').value = '';
    title.textContent = 'إضافة تصنيف جديد';
    
    // Show modal
    modal.style.display = 'block';
    
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

function openEditCategoryModal(categoryId) {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    const title = document.getElementById('modal-title');
    const category = getCategoryById(categoryId);
    
    if (!category) return;
    
    // Fill form with category data
    document.getElementById('category-id').value = category.id;
    document.getElementById('category-name-ar').value = category.name.ar;
    document.getElementById('category-name-en').value = category.name.en;
    document.getElementById('category-visible').value = category.visible;
    
    // Set image preview
    const imagePreview = document.getElementById('category-image-preview');
    if (category.image) {
        imagePreview.innerHTML = `<img src="${category.image}" alt="${category.name.ar}">`;
    } else {
        imagePreview.innerHTML = '';
    }
    
    title.textContent = 'تعديل التصنيف';
    
    // Show modal
    modal.style.display = 'block';
    
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

function openManageItemsModal(categoryId) {
    const modal = document.getElementById('items-modal');
    const category = getCategoryById(categoryId);
    
    if (!category) return;
    
    // Set category name in title
    document.getElementById('current-category-name').textContent = category.name.ar;
    
    // Load items for this category
    loadItemsForCategory(categoryId);
    
    // Show modal
    modal.style.display = 'block';
    
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

function loadItemsForCategory(categoryId) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    
    const items = getItemsByCategory(categoryId);
    
    if (items.length === 0) {
        itemsList.innerHTML = '<p>لا توجد أصناف في هذا التصنيف بعد.</p>';
        return;
    }
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.dataset.itemId = item.id;
        
        itemCard.innerHTML = `
            <img src="${item.image || '../shared/images/default-item.png'}" alt="${item.name.ar}" class="item-image">
            <div class="item-info">
                <div class="item-name">${item.name.ar} / ${item.name.en}</div>
                <div class="item-price">${item.price} ${getRestaurantData().currency}</div>
                ${item.description.ar ? `<div class="item-description">${item.description.ar}</div>` : ''}
                <span class="category-status ${item.visible === 'visible' ? 'status-visible' : 'status-hidden'}">
                    ${item.visible === 'visible' ? 'ظاهر' : 'مخفي'}
                </span>
            </div>
            <div class="category-actions">
                <button class="btn btn-primary btn-sm edit-item-btn" data-id="${item.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn ${item.visible === 'visible' ? 'btn-danger' : 'btn-success'} btn-sm toggle-item-visibility-btn" data-id="${item.id}">
                    <i class="fas ${item.visible === 'visible' ? 'fa-eye-slash' : 'fa-eye'}"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-item-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        itemsList.appendChild(itemCard);
    });
    
    // Add event listeners to item buttons
    document.querySelectorAll('.edit-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            openEditItemModal(itemId);
        });
    });
    
    document.querySelectorAll('.toggle-item-visibility-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            toggleItemVisibility(itemId);
        });
    });
    
    document.querySelectorAll('.delete-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            deleteItem(itemId);
        });
    });
}

function openAddItemModal(categoryId) {
    const modal = document.getElementById('item-modal');
    const form = document.getElementById('item-form');
    const title = document.getElementById('item-modal-title');
    
    // Reset form
    form.reset();
    document.getElementById('item-image-preview').innerHTML = '';
    document.getElementById('item-id').value = '';
    document.getElementById('item-category-id').value = categoryId;
    title.textContent = 'إضافة صنف جديد';
    
    // Show modal
    modal.style.display = 'block';
    
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

function openEditItemModal(itemId) {
    const modal = document.getElementById('item-modal');
    const form = document.getElementById('item-form');
    const title = document.getElementById('item-modal-title');
    const item = getItemById(itemId);
    
    if (!item) return;
    
    // Fill form with item data
    document.getElementById('item-id').value = item.id;
    document.getElementById('item-category-id').value = item.categoryId;
    document.getElementById('item-name-ar').value = item.name.ar;
    document.getElementById('item-name-en').value = item.name.en;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-description-ar').value = item.description.ar || '';
    document.getElementById('item-description-en').value = item.description.en || '';
    document.getElementById('item-visible').value = item.visible;
    
    // Set image preview
    const imagePreview = document.getElementById('item-image-preview');
    if (item.image) {
        imagePreview.innerHTML = `<img src="${item.image}" alt="${item.name.ar}">`;
    } else {
        imagePreview.innerHTML = '';
    }
    
    title.textContent = 'تعديل الصنف';
    
    // Show modal
    modal.style.display = 'block';
    
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

function toggleCategoryVisibility(categoryId) {
    const category = getCategoryById(categoryId);
    if (!category) return;
    
    category.visible = category.visible === 'visible' ? 'hidden' : 'visible';
    updateCategory(category);
    loadCategories();
}

function toggleItemVisibility(itemId) {
    const item = getItemById(itemId);
    if (!item) return;
    
    item.visible = item.visible === 'visible' ? 'hidden' : 'visible';
    updateItem(item);
    loadItemsForCategory(item.categoryId);
}

function deleteCategory(categoryId) {
    if (confirm('هل أنت متأكد من حذف هذا التصنيف؟ سيتم حذف جميع الأصناف التابعة له أيضًا.')) {
        removeCategory(categoryId);
        loadCategories();
    }
}

function deleteItem(itemId) {
    if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
        const item = getItemById(itemId);
        if (!item) return;
        
        removeItem(itemId);
        loadItemsForCategory(item.categoryId);
    }
}

function initEventListeners() {
    // Add category button
    document.getElementById('add-category-btn').addEventListener('click', openAddCategoryModal);
    
    // Add item button
    document.getElementById('add-item-btn').addEventListener('click', function() {
        const categoryId = document.getElementById('current-category-name').parentElement.querySelector('#items-list').dataset.categoryId;
        openAddItemModal(categoryId);
    });
    
    // Category form submission
    document.getElementById('category-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const categoryId = document.getElementById('category-id').value;
        const nameAr = document.getElementById('category-name-ar').value;
        const nameEn = document.getElementById('category-name-en').value;
        const visible = document.getElementById('category-visible').value;
        
        const categoryData = {
            id: categoryId || generateId(),
            name: { ar: nameAr, en: nameEn },
            visible: visible,
            order: getCategories().length
        };
        
        // Handle image upload
        const imageInput = document.getElementById('category-image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                categoryData.image = e.target.result;
                saveCategory(categoryData);
                loadCategories();
                document.getElementById('category-modal').style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        } else {
            // Keep existing image if no new image is uploaded
            if (categoryId) {
                const existingCategory = getCategoryById(categoryId);
                if (existingCategory && existingCategory.image) {
                    categoryData.image = existingCategory.image;
                }
            }
            
            saveCategory(categoryData);
            loadCategories();
            document.getElementById('category-modal').style.display = 'none';
        }
    });
    
    // Item form submission
    document.getElementById('item-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const itemId = document.getElementById('item-id').value;
        const categoryId = document.getElementById('item-category-id').value;
        const nameAr = document.getElementById('item-name-ar').value;
        const nameEn = document.getElementById('item-name-en').value;
        const price = parseFloat(document.getElementById('item-price').value);
        const descriptionAr = document.getElementById('item-description-ar').value;
        const descriptionEn = document.getElementById('item-description-en').value;
        const visible = document.getElementById('item-visible').value;
        
        const itemData = {
            id: itemId || generateId(),
            categoryId: categoryId,
            name: { ar: nameAr, en: nameEn },
            price: price,
            description: { ar: descriptionAr, en: descriptionEn },
            visible: visible
        };
        
        // Handle image upload
        const imageInput = document.getElementById('item-image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                itemData.image = e.target.result;
                saveItem(itemData);
                loadItemsForCategory(categoryId);
                document.getElementById('item-modal').style.display = 'none';
            };
            
            reader.readAsDataURL(file);
        } else {
            // Keep existing image if no new image is uploaded
            if (itemId) {
                const existingItem = getItemById(itemId);
                if (existingItem && existingItem.image) {
                    itemData.image = existingItem.image;
                }
            }
            
            saveItem(itemData);
            loadItemsForCategory(categoryId);
            document.getElementById('item-modal').style.display = 'none';
        }
    });
    
    // Logo upload
    document.getElementById('change-logo-btn').addEventListener('click', function() {
        document.getElementById('logo-upload').click();
    });
    
    document.getElementById('logo-upload').addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('restaurant-logo').src = e.target.result;
                updateRestaurantLogo(e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Background upload
    document.getElementById('change-bg-btn').addEventListener('click', function() {
        document.getElementById('bg-upload').click();
    });
    
    document.getElementById('bg-upload').addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('background-preview').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('background-preview').textContent = '';
                updateRestaurantBackground(e.target.result);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Reset background
    document.getElementById('reset-bg-btn').addEventListener('click', function() {
        document.getElementById('background-preview').style.backgroundImage = '';
        document.getElementById('background-preview').textContent = 'معاينة الخلفية';
        updateRestaurantBackground('');
    });
    
    // Save settings
    document.getElementById('save-settings-btn').addEventListener('click', function() {
        const name = document.getElementById('restaurant-name').value;
        const copyright = document.getElementById('copyright-text').value;
        const currency = document.getElementById('currency-symbol').value;
        
        updateRestaurantSettings({
            name: name,
            copyright: copyright,
            currency: currency
        });
        
        alert('تم حفظ الإعدادات بنجاح');
    });
    
    // Language switcher
    document.getElementById('switch-lang').addEventListener('click', function() {
        const currentLang = this.dataset.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        
        this.dataset.lang = newLang;
        this.textContent = newLang === 'ar' ? 'English' : 'العربية';
        
        // In a real app, you would implement full language switching
        alert('سيتم تطبيق ميزة التبديل بين اللغات في الإصدارات القادمة');
    });
    
    // Image preview for category
    document.getElementById('category-image').addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('category-image-preview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Image preview for item
    document.getElementById('item-image').addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('item-image-preview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            
            reader.readAsDataURL(file);
        }
    });
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}