// display the confirmation details for the user 
function displayConf() {
    let thankMessage = document.getElementById('thank-msg');
    let confNumber = document.getElementById('confirmation-nb');
    let orderId = JSON.parse(localStorage.getItem('orderid'));
    let contact = JSON.parse(localStorage.getItem('contact'));
    thankMessage.innerHTML = `Thank you <strong> ${contact.firstName} ${contact.lastName}</strong>`;
    confNumber.innerHTML = `Your confirmation number is :<strong> ${orderId}</strong>`;
}
displayConf()