// بيانات المطعم الأساسية
let restaurantData = {
    name: "Family Land & Bowling",
    copyright: "جميع الحقوق محفوظة",
    currency: "₪",
    logo: "images/logo.png",
    backgroundImage: "images/restaurant-bg.jpg"
};

// بيانات التصنيفات والأصناف
let menuData = {
    categories: [
        {
            id: "salads",
            name: { ar: "سلطات", en: "Salads" },
            image: "images/categories/salads.jpg",
            visible: "visible",
            order: 0
        },
        {
            id: "appetizers",
            name: { ar: "مقبلات", en: "Appetizers" },
            image: "images/categories/appetizers.jpg",
            visible: "visible",
            order: 1
        },
        {
            id: "sandwiches",
            name: { ar: "ساندويشات", en: "Sandwiches" },
            image: "images/categories/sandwiches.jpg",
            visible: "visible",
            order: 2
        },
        {
            id: "pizza",
            name: { ar: "بيتزا", en: "Pizza" },
            image: "images/categories/pizza.jpg",
            visible: "visible",
            order: 3
        },
        {
            id: "pasta",
            name: { ar: "باستا", en: "Pasta" },
            image: "images/categories/pasta.jpg",
            visible: "visible",
            order: 4
        },
        {
            id: "desserts",
            name: { ar: "حلويات", en: "Desserts" },
            image: "images/categories/desserts.jpg",
            visible: "visible",
            order: 5
        },
        {
            id: "juices",
            name: { ar: "عصائر طبيعية", en: "Fresh Juices" },
            image: "images/categories/juices.jpg",
            visible: "visible",
            order: 6
        },
        {
            id: "cocktails",
            name: { ar: "كوكتيل", en: "Cocktails" },
            image: "images/categories/cocktails.jpg",
            visible: "visible",
            order: 7
        },
        {
            id: "smoothie",
            name: { ar: "سمودي", en: "Smoothie" },
            image: "images/categories/smoothie.jpg",
            visible: "visible",
            order: 8
        },
        {
            id: "cold-drinks",
            name: { ar: "مشروبات باردة", en: "Cold Drinks" },
            image: "images/categories/cold-drinks.jpg",
            visible: "visible",
            order: 9
        },
        {
            id: "hot-drinks",
            name: { ar: "مشروبات ساخنة", en: "Hot Drinks" },
            image: "images/categories/hot-drinks.jpg",
            visible: "visible",
            order: 10
        },
        {
            id: "milkshakes",
            name: { ar: "ميلك شيك", en: "Milkshakes" },
            image: "images/categories/milkshakes.jpg",
            visible: "visible",
            order: 11
        },
        {
            id: "icecream",
            name: { ar: "بوظة", en: "Ice Cream" },
            image: "images/categories/icecream.jpg",
            visible: "visible",
            order: 12
        },
        {
            id: "argileh",
            name: { ar: "أراجيل", en: "Argileh" },
            image: "images/categories/argileh.jpg",
            visible: "visible",
            order: 13
        }
    ],
    items: [
        // سلطات
        {
            id: "salad-1",
            categoryId: "salads",
            name: { ar: "سلطة سيزر", en: "Caesar Salad" },
            price: 25,
            description: { ar: "خس، كراوتون، صلصة سيزر، جبنة بارميزان", en: "Lettuce, croutons, Caesar dressing, Parmesan cheese" },
            image: "images/items/caesar-salad.jpg",
            visible: "visible"
        },
        {
            id: "salad-2",
            categoryId: "salads",
            name: { ar: "سلطة يونانية", en: "Greek Salad" },
            price: 28,
            description: { ar: "خيار، طماطم، بصل، زيتون، جبنة فيتا", en: "Cucumber, tomato, onion, olives, feta cheese" },
            image: "images/items/greek-salad.jpg",
            visible: "visible"
        },
        
        // مقبلات
        {
            id: "appetizer-1",
            categoryId: "appetizers",
            name: { ar: "بطاطس مشوية", en: "Baked Potatoes" },
            price: 18,
            description: { ar: "بطاطس مشوية مع صلصة خاصة", en: "Baked potatoes with special sauce" },
            image: "images/items/baked-potatoes.jpg",
            visible: "visible"
        },
        
        // ساندويشات
        {
            id: "sandwich-1",
            categoryId: "sandwiches",
            name: { ar: "ساندويش برجر", en: "Burger Sandwich" },
            price: 35,
            description: { ar: "لحم بقري، خس، طماطم، بصل، مخلل، صلصة خاصة", en: "Beef, lettuce, tomato, onion, pickles, special sauce" },
            image: "images/items/burger.jpg",
            visible: "visible"
        },
        
        // بيتزا
        {
            id: "pizza-1",
            categoryId: "pizza",
            name: { ar: "بيتزا بيبروني", en: "Pepperoni Pizza" },
            price: 45,
            description: { ar: "صلصة طماطم، جبنة موزاريلا، بيبروني", en: "Tomato sauce, mozzarella cheese, pepperoni" },
            image: "images/items/pepperoni-pizza.jpg",
            visible: "visible"
        },
        
        // مشروبات باردة
        {
            id: "cold-drink-1",
            categoryId: "cold-drinks",
            name: { ar: "كولا", en: "Cola" },
            price: 12,
            description: { ar: "مشروب غازي", en: "Carbonated drink" },
            image: "images/items/cola.jpg",
            visible: "visible"
        }
    ]
};

// وظائف الوصول إلى البيانات
function getRestaurantData() {
    return restaurantData;
}

function updateRestaurantData(newData) {
    restaurantData = { ...restaurantData, ...newData };
    saveToLocalStorage();
}

function updateRestaurantLogo(logoUrl) {
    restaurantData.logo = logoUrl;
    saveToLocalStorage();
}

function updateRestaurantBackground(bgUrl) {
    restaurantData.backgroundImage = bgUrl;
    saveToLocalStorage();
}

function updateRestaurantSettings(settings) {
    restaurantData.name = settings.name || restaurantData.name;
    restaurantData.copyright = settings.copyright || restaurantData.copyright;
    restaurantData.currency = settings.currency || restaurantData.currency;
    saveToLocalStorage();
}

function getCategories() {
    return [...menuData.categories].sort((a, b) => a.order - b.order);
}

function getCategoryById(id) {
    return menuData.categories.find(cat => cat.id === id);
}

function getVisibleCategories() {
    return getCategories().filter(cat => cat.visible === 'visible');
}

function saveCategory(category) {
    const index = menuData.categories.findIndex(cat => cat.id === category.id);
    
    if (index >= 0) {
        // Update existing category
        menuData.categories[index] = category;
    } else {
        // Add new category
        menuData.categories.push(category);
    }
    
    saveToLocalStorage();
}

function removeCategory(id) {
    // Remove category
    menuData.categories = menuData.categories.filter(cat => cat.id !== id);
    
    // Remove all items in this category
    menuData.items = menuData.items.filter(item => item.categoryId !== id);
    
    saveToLocalStorage();
}

function updateCategoriesOrder(newOrder) {
    newOrder.forEach(item => {
        const category = getCategoryById(item.id);
        if (category) {
            category.order = item.order;
        }
    });
    
    saveToLocalStorage();
}

function getItemsByCategory(categoryId) {
    return menuData.items.filter(item => item.categoryId === categoryId);
}

function getItemById(id) {
    return menuData.items.find(item => item.id === id);
}

function saveItem(item) {
    const index = menuData.items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
        // Update existing item
        menuData.items[index] = item;
    } else {
        // Add new item
        menuData.items.push(item);
    }
    
    saveToLocalStorage();
}

function removeItem(id) {
    menuData.items = menuData.items.filter(item => item.id !== id);
    saveToLocalStorage();
}

function toggleCategoryVisibility(id) {
    const category = getCategoryById(id);
    if (category) {
        category.visible = category.visible === 'visible' ? 'hidden' : 'visible';
        saveToLocalStorage();
    }
}

function toggleItemVisibility(id) {
    const item = getItemById(id);
    if (item) {
        item.visible = item.visible === 'visible' ? 'hidden' : 'visible';
        saveToLocalStorage();
    }
}

// Local Storage functions
function saveToLocalStorage() {
    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    localStorage.setItem('menuData', JSON.stringify(menuData));
}

function loadFromLocalStorage() {
    const savedRestaurantData = localStorage.getItem('restaurantData');
    const savedMenuData = localStorage.getItem('menuData');
    
    if (savedRestaurantData) {
        restaurantData = JSON.parse(savedRestaurantData);
    }
    
    if (savedMenuData) {
        menuData = JSON.parse(savedMenuData);
    }
}

// Initialize by loading from localStorage
loadFromLocalStorage();