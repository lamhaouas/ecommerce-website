// get the DATA from the server using fetch and check for the response ok status

fetch('http://localhost:3000/api/teddies')
  .then(response => {
    if (!response.ok) {
      throw Error();
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    alert('server is down')
  });
