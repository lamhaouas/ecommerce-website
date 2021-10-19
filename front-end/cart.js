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
    if (localStorageItems !== null) {
        for (let i = 0; i < localStorageItems.length; i++) {
            //create elements of table 
            let table = document.getElementById('cart-content')
            let tr = document.createElement('tr');
            let thName = document.createElement('th');
            let thColor = document.createElement('th');
            let thPrice = document.createElement('th');
            thPrice.className = 'product-price';
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
}
displayCart();
//count the product in cart
function cartNumbers() {
    let localStorageItems = localStorage.getItem('cart');
    let localStorageArray = JSON.parse(localStorageItems);
    if (localStorageItems !== null) {
        document.getElementById('count').innerHTML = localStorageArray.length;
    }
}
// remove single item from cart
function removeProduct(index) {
    let localStorageItems = JSON.parse(localStorage.getItem('cart'));
    localStorageItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(localStorageItems));
    window.location.reload();
};
// total cost of the products in cart
let cart = JSON.parse(localStorage.getItem('cart'));
let total = 0
if (cart !== null) {
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].productPrice
    }
    let priceToString = total.toString();
    let splicedPrice = priceToString.slice(0, -2);


    let totalCost = document.getElementById('total-cost')
    totalCost.innerHTML = '$ ' + splicedPrice + '.00';
}


//---------------------------------------------------------------------------------------------------------------------

// Post data (contact object + products array) to the backend
let submit = document.getElementById('submit-order');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let eMail = document.getElementById('e-mail');
let address = document.getElementById('address');
let city = document.getElementById('city');

let products = [];
let cartArray = JSON.parse(localStorage.getItem('cart'));
submit.addEventListener('click', () => {
    for (let i = 0; i < cartArray.length; i++) {
        products.push(cartArray[i].productId);
    }
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: eMail.value,
        address: address.value,
        city: city.value,
    };
    let data = {
        contact: contact,
        products: products,
    }
    makeRequest(data)
})

function makeRequest(data) {
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)
    }).then((res) => {
        return res.json();
    }).then((response) => {
        localStorage.setItem('contact', JSON.stringify(response.contact));
        localStorage.setItem('orderid', JSON.stringify(response.orderId));
        window.location.replace('confirmation.html');
    }).catch((err) => {
        console.log(err);
    })
};