// get the DATA from the server using fetch and check for the response ok status
function getProducts() {
  fetch('http://localhost:3000/api/teddies')
    .then(response => {
      console.log(response)
      // check for errors
      if (!response.ok) {
        throw Error();
      }
      return response.json();
    })
    .then((data) => {

      console.log(data);

      const html = data
        .map(teddies => {
          return `
          <div class="product" id="product">
          <a href="">
            <div class="card" style="width: 18rem;">
              <img src="${teddies.imageUrl}" class="card-img-top" alt="${teddies.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${teddies.name}</h5>
            <p class="card-text">${teddies.description}</p>
            <p>${teddies.price}$</p>
            <a href="${teddies.name}" class="btn btn-primary">Add to cart</a>
          </div>
        </div>
        `;
        }).join('');

      document.querySelector('#product').insertAdjacentHTML("afterbegin", html);

    })

    .catch(error => {
      alert('server is down')
    });
}

getProducts()