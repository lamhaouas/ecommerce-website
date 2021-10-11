// display a message when the local storage is emty
function cartIsEmpty() {
    let emptyCart = document.getElementById('cart-is-emty');
    let productInLocalStorage = localStorage.getItem('cart');
    productInLocalStorage = JSON.parse(productInLocalStorage)
    if (productInLocalStorage === null || productInLocalStorage.length === 0) {
        emptyCart.innerHTML = "Your cart is empty"
    }
}

cartIsEmpty()

// display the cart’s contents 
function displayCart() {
    let localStorageItems = JSON.parse(localStorage.getItem('cart'));
    // convert the price to $ 00.00 format
    const toUsd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    for (let i = 0; i < localStorageItems.length; i++) {
        //create elements of table 
        let table = document.getElementById('cart-content')
        let tr = document.createElement('tr');
        let thName = document.createElement('th');
        let thColor = document.createElement('th');
        let thPrice = document.createElement('th');
        let removeButton = document.createElement('th');

        let priceToString = localStorageItems[i].productPrice.toString();
        let splicedPrice = priceToString.slice(0, 2);

        thName.innerHTML = localStorageItems[i].productName;
        thColor.innerHTML = localStorageItems[i].productColor;
        thPrice.innerHTML = toUsd.format(splicedPrice);
        removeButton.innerHTML = `<button id="remove-button" type="button" class="btn bg-danger" onclick=' removeProduct(${i})' style="width:40px;"><i
        class="fas fa-trash-alt"></i></button>`;

        //append elements to tr
        tr.append(thName, thColor, thPrice, removeButton)
        table.append(tr)
    }
    cartNumbers()
}
displayCart();
//count the product in cart
function cartNumbers() {
    let localStorageItems = localStorage.getItem('cart');
    let localStorageArray = JSON.parse(localStorageItems);
    document.getElementById('count').innerHTML = localStorageArray.length;
}
// remove single item from cart
function removeProduct(index) {
    let localStorageItems = JSON.parse(localStorage.getItem('cart'));
    localStorageItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(localStorageItems));
    window.location.reload();
};