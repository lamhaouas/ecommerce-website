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
            // create a function to show selected product 
            function createProduct() {

                const productImage = document.getElementById('product-img');
                const productTiltle = document.getElementById('product-title');
                const productDesc = document.getElementById('product-description');
                const colors = document.getElementById('select');
                const price = document.getElementById('price');
                let color = data.colors;

                productImage.setAttribute('src', teddy.imageUrl);
                productTiltle.innerHTML = teddy.name;
                productDesc.innerHTML = teddy.description;
                // convert the price to $ 00.00 format
                const toUsd = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                });
                // convert price data to a string and substring the first 2 numbers  
                let priceToString = teddy.price.toString();
                let thePrice = priceToString.substring(0, 2);
                // update html with the price new format
                price.innerHTML = toUsd.format(thePrice);
                // colors options 
                for (let i in color) {
                    const teddyColor = document.createElement("option");
                    teddyColor.textContent = color[i];
                    colors.appendChild(teddyColor);
                }

            }


            // call the createProduct function
            createProduct()

            // create a function to store product when clicking on add to cart to localestorage
            function addToCart() {
                //access the DOM
                const addToCartBtn = document.getElementById('add-to-cart');
                //add event listener

                addToCartBtn.addEventListener('click', () => {
                    let teddyColor = document.getElementById('select');
                    let productInCart = {
                        imageUrl: teddy.imageUrl,
                        name: teddy.name,
                        colors: teddyColor.value,
                        price: teddy.price,
                    };
                    let productsInCart = [];
                    productsInCart.push(productInCart);
                    localStorage.setItem('productInCart', JSON.stringify(productInCart)); // convert object to string

                    // count the number of products in cart and   the span content
                    function cartNumbers() {
                        let numberOfProducts = localStorage.getItem('numberOfProducts');
                        console.log(typeof numberOfProducts);
                        numberOfProducts = parseInt(numberOfProducts); // convert the string to number
                        if (numberOfProducts) {
                            localStorage.setItem('numberOfProducts', numberOfProducts + 1);
                            document.getElementById('count').textContent = numberOfProducts + 1;
                        } else {
                            localStorage.setItem('numberOfProducts', 1);

                            document.getElementById('count').textContent = 1;
                        }

                    }
                    cartNumbers()

                })


            }
            //create function onLoadCartNumbers to sync the cartNumbers with the number of products in localstorage

            function onLoadCartNumbers() {
                let numberOfProducts = localStorage.getItem('numberOfProducts');
                if (numberOfProducts) {
                    document.getElementById('count').textContent = numberOfProducts;
                }

            }
            // call addToCart function

            addToCart()
            // call onLoadCartNumbers function
            onLoadCartNumbers()

        })
        .catch(error => {
            document.getElementById("product").innerHTML = "Please try later, Thank you!";
        });
}


// call the showProduct function
showProduct();