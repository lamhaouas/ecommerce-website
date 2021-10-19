// get the DATA from the server using fetch and check for the response ok status

function getProducts() {

  fetch('http://localhost:3000/api/teddies')
    .then(response => {
      // check for errors using the ok status
      if (!response.ok) {
        throw Error();
      }
      return response.json();
    })
    .then((data) => {
      // map over the array of data and creat the product cards + add the id key to the url
      // convert the price to $ 00.00 format
      const toUsd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      // console.log(typeof data);
      const html = data

        .map(teddies => {
          // convert price data to a string and substring the first 2 numbers  
          let priceToString = teddies.price.toString();
          let thePrice = priceToString.slice(0, 2);
          return `
           <div class=" card p-2 ">
             <a href="product.html?id=${teddies._id}">
               <img src="${teddies.imageUrl}" class="card-img-top" alt="${teddies.name}">
             </a>
             <div >
              <h5>${teddies.name}</h5>
              <p>${toUsd.format(thePrice)}</p>
              <a href="product.html?id=${teddies._id}" class="btn btn-primary">More details</a>
             </div>
            </div>
        `;

        }).join('');
      //insert the html data into the products div

      document.querySelector('#products').insertAdjacentHTML("afterbegin", html);

    })

    .catch(error => {
      document.getElementById("products").innerHTML = "Please try later, Thank you!";
    });
}


//call getProducts function
getProducts()

function cartCount() {
  let productInLocalStorage = localStorage.getItem('cart');
  let productArray = JSON.parse(productInLocalStorage);
  if (productInLocalStorage !== null) {
    document.getElementById('count').innerHTML = productArray.length;
  }
}
cartCount();