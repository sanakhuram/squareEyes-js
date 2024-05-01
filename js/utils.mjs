export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.add('show');
}

export function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.classList.remove('show');
}

export function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let currentCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = `CART(${currentCount})`;
}

export function updateCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

export function updateBasketCount() {
    const basketCount = parseInt(localStorage.getItem('basketCount')) || 0;
    localStorage.setItem('basketCount', basketCount + 1);
}


export function updateBasketCountInView(basketCount) {
    document.getElementById("basket-count").innerText = basketCount;
    document.getElementById("basket-count-icon").innerText = basketCount;
}

export function updateBasketCountInLocalStorage() {
    let basketCount = parseInt(localStorage.getItem('basketCount')) || 0;
    basketCount++;
    localStorage.setItem('basketCount', basketCount);
}
export function clearBasketCountInLocalStorage() {
    localStorage.removeItem('basketCount');
}
