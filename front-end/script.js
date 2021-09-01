// get the DATA from the server using fetch
fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(data => console.log(data)); 