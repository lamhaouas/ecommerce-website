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
            // creat single product using jQuery append
            const teddy = data;

            function createProduct() {

                const productImage = document.getElementById('product-img');
                const productTiltle = document.getElementById('product-title');
                const productDesc = document.getElementById('product-description');
                const optionOne = document.getElementById('option-0');
                const optionTwo = document.getElementById('option-1');
                const optionThree = document.getElementById('option-2');
                const optionFour = document.getElementById('option-3');

                productImage.setAttribute('src', teddy.imageUrl);
                productTiltle.innerHTML = teddy.name;
                productDesc.innerHTML = teddy.description;
                optionOne.innerHTML = teddy.colors[0];
                optionTwo.innerHTML = teddy.colors[1];
                optionThree.innerHTML = teddy.colors[2];
                optionFour.innerHTML = teddy.colors[3];
            }
            // call the creat product function
            createProduct()

            //-----------------------------------------------------------------------------------------------------------

            // creat single product using jQuery append
            // const teddy = data;
            // console.log(teddy);
            // $('#product').append(`
            // <img class="col-lg-6" src="${teddy.imageUrl}" alt="" >
            // <div class="col-lg-6">
            //     <h1>${teddy.name}</h1>
            //     <p>${teddy.description}</p>
            //     <form id="productForm" action="">
            //         <label id="productLabel" for="">Color</label>
            //         <select name="" id="">
            //             <option value="">${teddy.colors[0]}</option>
            //             <option value="">${teddy.colors[1]}</option>
            //             <option value="">${teddy.colors[2]}</option>
            //             <option value="">${teddy.colors[3]}</option>
            //         </select>
            //     </form>
            //     <button class=" btn btn-outline-primary" id="addToCart">Add to cart</button>
            // `);
            //-----------------------------------------------------------------------------------------------------------


        })
        .catch(error => {
            document.getElementById("product").innerHTML = "Please try later, Thank you!";
        });
}

// call the showProduct function
showProduct();