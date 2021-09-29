console.log('test')

// display the cart’s contents 
function cartProducts() {

    const cartContent = document.getElementById('cart-content');
    let cartArray = JSON.parse(localStorage.getItem('cart'));
    console.log(typeof cartArray);
    cartContent.innerHTML = cartArray[10].productColor;
}

cartProducts();