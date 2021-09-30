//get the parameter value from the page link
function getParam(parameterKey) {
    let parameter = new URLSearchParams(window.location.search);
    return parameter.get(parameterKey);
}

//fetch product API + id

function showProduct() {
    fetch('http://localhost:3000/api/teddies/' + getParam("id"))
        .then(response => {
            // check for errors using the ok status
            if (!response.ok) {
                throw Error();
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            teddy = data;
            // call the functions
            createProduct(teddy);
            addToCart(teddy);

        })
        .catch(error => {
            document.getElementById("product").innerHTML = "Please try later, Thank you!";
        });
}
// create a function to show selected product

function createProduct(teddy) {
    const productImage = document.getElementById('product-img');
    const productTitle = document.getElementById('product-title');
    const productDesc = document.getElementById('product-description');
    const colors = document.getElementById('select');
    const price = document.getElementById('price');
    let color = teddy.colors;
    productImage.setAttribute('src', teddy.imageUrl);
    productTitle.innerHTML = teddy.name;
    productDesc.innerHTML = teddy.description;
    // convert the price to $ 00.00 format
    const toUsd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    let priceToString = teddy.price.toString();
    let thePrice = priceToString.substring(0, 2);
    price.innerHTML = toUsd.format(thePrice);
    // colors options 
    for (let i in color) {
        const teddyColor = document.createElement("option");
        teddyColor.textContent = color[i];
        colors.appendChild(teddyColor);
    }


}
// create a function to store product when clicking on add to cart to localestorage

function addToCart(teddy) {
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        //store the product data into localstorage
        let productsInCart = [];
        let teddyColor = document.getElementById('select');
        //check if local storage is empty and push a new product into localstorage
        let product = {
            productId: teddy._id,
            productQuantity: 1,
            productColor: teddyColor.value
        };

        if (localStorage.getItem('cart') === null) {


        } else {
            productsInCart = JSON.parse(localStorage.getItem('cart'));

        }



        productsInCart.push(product);
        localStorage.setItem('cart', JSON.stringify(productsInCart));





        // call cartNumbers function when clicking on add to cart
        cartNumbers(teddy);

    })

}
// count the number of products in cart and  update the span content

function cartNumbers() {
    let numberOfProducts = localStorage.getItem('numberOfProducts');
    numberOfProducts = parseInt(numberOfProducts); // convert the string to number
    if (numberOfProducts) {
        localStorage.setItem('numberOfProducts', numberOfProducts + 1);
        document.getElementById('count').textContent = numberOfProducts + 1;
    } else {
        localStorage.setItem('numberOfProducts', 1);
        document.getElementById('count').textContent = 1;
    }
}

// call the showProduct function
showProduct();