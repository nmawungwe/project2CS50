document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox(
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


  return `<button data-email="${email.id}" class="btn btn-secondary email wrapper"><div class ="column_1"><b>${email.sender}</b>     ${email.subject}</div><div class="column_2">${date}</button>`
}

document.querySelectorAll('.email').forEach(button=>{
  
    button.onclick = function() {

     console.log('clicking')
 
      load_email(this.dataset.email)

}
     })

  })))

  document.querySelector('#sent').addEventListener('click', () => load_mailbox(
    fetch('/emails/sent').then(response => response.json()).then(emails => {
      // Print emails
      // console.log(emails)
      // https://www.encodedna.com/javascript/how-to-remove-commas-from-array-in-javascript.htm 
      var messages = emails.map(label).join(' ')
      document.querySelector('#emails-view').innerHTML = messages
      
function label(email) {
// const email_id = email.id
// console.log(email_id)
  let time = new Date(email.timestamp)
  console.log(time.toDateString())

  let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

  // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
  return `<button data-email="${email.id}" class="btn btn-secondary email wrapper"><div class ="column_1"><b>${email.sender}</b>  ${email.subject}</div><div class="column_2">${date}</div></button>`
}


document.querySelectorAll('.email').forEach(button=>{

  button.onclick = function() {

    console.log('clicking')

    load_email(this.dataset.email)

}
    })


  })))

  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('form').onsubmit = function() {
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;
  
      fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: recipients,
            subject: subject,
            body: body
        })
      })
      .then(response => response.json())
      .then(result => {
          // Print result
          // console.log(result);
          load_mailbox('inbox')
      });
      return false;
    }

  // By default, load the inbox
  load_mailbox('inbox');
});

document.addEventListener('DOMContentLoaded', function() {





})

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-ind').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox() {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'none';

  // Show the mailbox name
  // document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function load_email(email) {
  
  // Show email and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'block';

  fetch(`/emails/${email}`).then(response => response.json()).then(email => {
    // Print email
    console.log(email)
    console.log(email.sender)
  
    let time = new Date(email.timestamp)
    let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

    // date = time.toTimeString()
    console.log(date)
  
    document.querySelector('#email-ind').innerHTML = `<b>From:</b> ${email.sender}<br><b>To: </b>${email.recipients}<br>
    <b>Subject: </b>${email.subject}<br>
    <b>Timestamp: </b>${date}<br>
    <button class="btn btn-sm btn-outline-primary">Reply</button>
    <hr>
    ${email.body}`
  
  
  
  })
  

  // Show the mailbox name
  // document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}