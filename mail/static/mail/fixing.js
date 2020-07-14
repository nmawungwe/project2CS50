document.addEventListener('DOMContentLoaded', function() {
document.querySelector('#inbox').addEventListener('click', ()=>{ load_mailbox(
    fetch('/emails/inbox').then(response => response.json()).then(emails => {
        // Print emails
        // console.log(emails)
    // ... do something else with emails ...
    var messages = emails.map(label).join(' ')
    document.querySelector('#emails-view').innerHTML = messages
    
    function label(email) {

    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

    // https://stackoverflow.com/questions/48384163/javascript-remove-day-name-from-date
        let time = new Date(email.timestamp)
        console.log(time.toDateString())
        
        let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

        return `<button data-email="${email.id}" class="btn btn-secondary email wrapper"><div class ="column_1"><b>${email.sender}</b>   ${email.subject}</div><div class="column_2">${date}</button>`
    }