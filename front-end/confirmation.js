// display the confirmation details for the user 
function displayConf() {
    let thankMessage = document.getElementById('thank-msg');
    let confNumber = document.getElementById('confirmation-nb');
    let orderId = JSON.parse(sessionStorage.getItem('orderid'));
    let contact = JSON.parse(sessionStorage.getItem('contact'));
    let total = JSON.parse(localStorage.getItem('total'));
    thankMessage.innerHTML = `Thank you <strong> ${contact.firstName} ${contact.lastName}</strong>`;
    confNumber.innerHTML = `Your total price is: <strong>${'$' +total}</strong> and your confirmation number is :<strong> ${orderId}</strong>`;
}
displayConf()