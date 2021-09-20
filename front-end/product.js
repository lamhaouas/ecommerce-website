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
            // creat single product using jQuery append
            const teddy = data;
            console.log(teddy);
            $('#product').append(`
            <img class="col-lg-6" src="${teddy.imageUrl}" alt="" >
            <div class="col-lg-6">
                <h1>${teddy.name}</h1>
                <p>${teddy.description}</p>
                <form id="productForm" action="">
                    <label id="productLabel" for="">Color</label>
                    <select name="" id="">
                        <option value="">${teddy.colors[0]}</option>
                        <option value="">${teddy.colors[1]}</option>
                        <option value="">${teddy.colors[2]}</option>
                        <option value="">${teddy.colors[3]}</option>
                    </select>
                </form>
                <button class=" btn btn-outline-primary" id="addToCart">Add to cart</button>
            `);
        })
        .catch(error => {
            document.getElementById("product").innerHTML = "Please try later, Thank you!";
        });
}

// call the showProduct function
showProduct();