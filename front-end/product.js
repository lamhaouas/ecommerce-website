//get the parameter value from the page link
function getParam(parameterKey) {
    let parameter = new URLSearchParams(window.location.search);
    return parameter.get(parameterKey);
}

//fetch product API + id
fetch('http://localhost:3000/api/teddies/' + getParam("id"))
    .then(response => {
        console.log(response)

        // check for errors using the ok status

        if (!response.ok) {
            throw Error();
        }
        return response.json();
    })
    .then((data) => {

        console.log(data)
    })