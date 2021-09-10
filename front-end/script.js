// get the DATA from the server using fetch and check for the response ok status

function getProducts() {

  fetch('http://localhost:3000/api/teddies')
    .then(response => {
      console.log(response)

      // check for errors using the ok status

      if (!response.ok) {
        throw Error();
      }
      return response.json();
    })
    .then((data) => {

      console.log(data);

      // map over the array of data

      // convert the price to USD
      const toUsd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      const html = data
        .map(teddies => {
          return `
           <div class=" card p-2 bd-highlight">
             <a href="">
               <img src="${teddies.imageUrl}" class="card-img-top" alt="${teddies.name}">
             </a>
             <div >
              <h5>${teddies.name}</h5>
              <p>${toUsd.format(teddies.price*0.01)}</p>
              <a href="#" class="btn btn-primary">More details</a>
             </div>
            </div>
        `;
        }).join('');
      //insert the html data into the product div

      document.querySelector('#products').insertAdjacentHTML("afterbegin", html);

    })

    .catch(error => {
      document.getElementById("products").innerHTML = "Please try later, Thank you!";
    });
}


//call getProducts function
getProducts()