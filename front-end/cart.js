// display a message when the local storage is emty
function cartIsEmpty() {
    let emptyCart = document.getElementById('cart-is-emty');
    let productInLocalStorage = localStorage.getItem('cart');
    if (productInLocalStorage === null) {
        emptyCart.innerHTML = "Your cart is empty"
    }
}
cartIsEmpty()
// display the cart’s contents 
function displayCart() {
    let localStorageArray = JSON.parse(localStorage.getItem('cart'));
    console.log(localStorageArray);

    const objectData = localStorageArray
        .map(localStorageArray => {

            return `<tr>
                       <th>${localStorageArray.productName}</th>
                       <th>${localStorageArray.productColor}</th>
                        <th><input style="width:40px;" type="number" name=""
                            min="1" max="10"></th>
                        <th><button id="remove-button" type="button" class="btn" style="width:35px;" onclick='removeItem()'>X</button></th>
                    </tr>`;
        }).join('');

    document.querySelector('#cart-content').insertAdjacentHTML("beforeend", objectData);

}

displayCart();

//count the product in cart
function cartNumbers() {
    let productInLocalStorage = localStorage.getItem('cart');
    let localStorageArray = JSON.parse(productInLocalStorage);
    document.getElementById('count').innerHTML = localStorageArray.length;
}
cartNumbers()

// remove single item from cart
function removeItem(i) {

    let localStorageArray = JSON.parse(localStorage.getItem('cart'));
    let productIndex = i
    localStorageArray.splice(productIndex, 1);
    localStorage.setItem('cart', JSON.stringify(localStorageArray));
}