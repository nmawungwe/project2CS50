document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox(
    fetch('/emails/inbox').then(response => response.json()).then(emails => {
      // Print emails
      // console.log(emails)
    // ... do something else with emails ...
    var messages = emails.map(label).join(' ')
    document.querySelector('#mailbox-listing').innerHTML = messages
    document.querySelector('#mailbox-heading').innerHTML = `<h3>Inbox</h3>`
    

function label(email) {
// let time = email.timestamp.toDateString()
// In JavaScript, a timestamp is the number of milliseconds that have passed since January 1, 1970.
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
// https://stackoverflow.com/questions/48384163/javascript-remove-day-name-from-date
let time = new Date(email.timestamp)
// console.log(time.toDateString())
// console.log(email.read)
let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")


if (email.read===true) {
  // console.log('email read')
  return `<button data-email="${email.id}" class="btn read email wrapper"><div class ="column_1"><b>${email.sender}</b>     ${email.subject}</div><div class="column_2">${date}</button>`

} else {
  // console.log('Nadaa')
  return `<button data-email="${email.id}" class="btn unread email wrapper"><div class ="column_1"><b>${email.sender}</b>     ${email.subject}</div><div class="column_2">${date}</button>`
}}


document.querySelectorAll('.email').forEach(button=>{
    button.onclick = function() {
    //  console.log('clicking')
      load_email()
      email = this.dataset.email
      fetch(`/emails/${email}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        })
      })
      fetch(`/emails/${email}`).then(response => response.json()).then(email => {
        // Print email
        // console.log(email)
        // console.log(email.sender)      
          let time = new Date(email.timestamp)
          let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
          // date = time.toTimeString()
          // console.log(date)
        document.querySelector('#sender').innerHTML = `<b>From:</b>${email.sender}`
        document.querySelector('#recipients').innerHTML = `<b>To:</b> ${email.recipients}`
        document.querySelector('#subject').innerHTML = `<b>Subject: </b>${email.subject}`
        document.querySelector('#timestamp').innerHTML =`<b>Timestamp: </b>${date}`
        document.querySelector('#reply').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary reply">Reply</button>`
        document.querySelector('#archive').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary archive">Archive</button>` 
        document.querySelector('#unarchive').innerHTML =`` 
        document.querySelector('#body').innerHTML =`${email.body}` 
      })
}
     })
  })))

document.querySelector('#sent').addEventListener('click', () => load_mailbox(
  fetch('/emails/sent').then(response => response.json()).then(emails => {
      // Print emails
      // console.log(emails)
      // https://www.encodedna.com/javascript/how-to-remove-commas-from-array-in-javascript.htm 
      var messages = emails.map(label).join(' ')
      document.querySelector('#mailbox-listing').innerHTML = messages
      document.querySelector('#mailbox-heading').innerHTML = `<h3>Sent</h3>`
          
function label(email) {
// const email_id = email.id
// console.log(email_id)
  let time = new Date(email.timestamp)
  // console.log(time.toDateString())
  let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
    return `<button data-email="${email.id}" class="btn read email wrapper"><div class ="column_1"><b>${email.sender}</b>  ${email.subject}</div><div class="column_2">${date}</div></button>`
}

document.querySelectorAll('.email').forEach(button=>{
  button.onclick = function() {
    // console.log('clicking')
    load_email()
    email = this.dataset.email
    fetch(`/emails/${email}`).then(response => response.json()).then(email => {
      // Print email
      // console.log(email)
      // console.log(email.sender)
        let time = new Date(email.timestamp)
        let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
      // date = time.toTimeString()
      // console.log(date)
      // document.querySelector('#mailbox-heading').innerHTML = `<h3>Inbox</h3>`
      document.querySelector('#sender').innerHTML = `<b>From:</b>${email.sender}`
      document.querySelector('#recipients').innerHTML = `<b>To:</b> ${email.recipients}`
      document.querySelector('#subject').innerHTML = `<b>Subject: </b>${email.subject}`
      document.querySelector('#timestamp').innerHTML =`<b>Timestamp: </b>${date}`
      document.querySelector('#reply').innerHTML =``
      document.querySelector('#archive').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary">Archive</button>`
      document.querySelector('#body').innerHTML =`${email.body}`
    })
}
})
})))

document.querySelector('#archived').addEventListener('click', () => load_mailbox(
  fetch('/emails/archive').then(response => response.json()).then(emails => {
      // Print emails
      // console.log(emails)
      // https://www.encodedna.com/javascript/how-to-remove-commas-from-array-in-javascript.htm 
      var messages = emails.map(label).join(' ')
      document.querySelector('#mailbox-listing').innerHTML = messages
      document.querySelector('#mailbox-heading').innerHTML = `<h3>Archived</h3>`

  function label(email) {
// const email_id = email.id
// console.log(email_id)
    let time = new Date(email.timestamp)
    // console.log(time.toDateString())
    let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    // https://stackoverflow.com/questions/2914443/how-to-hold-three-different-text-alignments-in-one-css-box
      return `<button data-email="${email.id}" class="btn read email wrapper"><div class ="column_1"><b>${email.sender}</b>  ${email.subject}</div><div class="column_2">${date}</div></button>`
}    


document.querySelectorAll('.email').forEach(button=>{
  button.onclick = function() {
    // console.log('clicking')
    load_email()
    email = this.dataset.email
    fetch(`/emails/${email}`).then(response => response.json()).then(email => {
      // Print email
      // console.log(email)
      // console.log(email.sender)
      let time = new Date(email.timestamp)
      let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
      // date = time.toTimeString()
      // console.log(date)
      // document.querySelector('#mailbox-heading').innerHTML = `<h3>Inbox</h3>`
      document.querySelector('#sender').innerHTML = `<b>From:</b>${email.sender}`
      document.querySelector('#recipients').innerHTML = `<b>To:</b> ${email.recipients}`
      document.querySelector('#subject').innerHTML = `<b>Subject: </b>${email.subject}`
      document.querySelector('#timestamp').innerHTML =`<b>Timestamp: </b>${date}`
      document.querySelector('#archive').innerHTML =``
      document.querySelector('#unarchive').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary">Unarchive</button>`
      document.querySelector('#body').innerHTML =`${email.body}`
    })
}
})
    })

// -----------------
));
document.querySelector('#unarchive').addEventListener('click',()=> unarchive(
  function () {
    email =dataset.email

  }
));
document.querySelector('#archive').addEventListener('click',()=> archive(
  function () {
      email =dataset.email
    }
  ));
document.querySelector('#reply').addEventListener('click',()=> reply_email(
  function () {
      email =dataset.email
    }
  ))


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
      }).then(response => response.json()).then(result => {
          // Print result
          // console.log(result);
          load_mailbox()
      });
      return false;
    }
  // By default, load the inbox
load_mailbox(fetch('/emails/inbox').then(response => response.json()).then(emails => {
// Print emails
// console.log(emails)
// ... do something else with emails ...
  var messages = emails.map(label).join(' ')
  document.querySelector('#mailbox-listing').innerHTML = messages
  document.querySelector('#mailbox-heading').innerHTML = `<h3>Inbox</h3>`
  function label(email) {
  // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  // https://stackoverflow.com/questions/48384163/javascript-remove-day-name-from-date
  let time = new Date(email.timestamp)
  // console.log(time.toDateString())

  let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

  // labelling the read from the unread
  if (email.read===true) {
  // console.log('email read')
    return `<button data-email="${email.id}" class="btn read email wrapper"><div class ="column_1"><b>${email.sender}</b>     ${email.subject}</div><div class="column_2">${date}</button>`
} else {
  // console.log('Nadaa')
  return `<button data-email="${email.id}" class="btn unread email wrapper"><div class ="column_1"><b>${email.sender}</b>     ${email.subject}</div><div class="column_2">${date}</button>`
}}

document.querySelectorAll('.email').forEach(button=>{
  button.onclick = function() {
    // console.log('clicking')
    load_email()
    email = this.dataset.email
    fetch(`/emails/${email}`).then(response => response.json()).then(email => {
      // Print email
      // console.log(email)
      // console.log(email.sender)
    
      let time = new Date(email.timestamp)
      let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  
      // date = time.toTimeString()
      // console.log(date)
    
      document.querySelector('#sender').innerHTML = `<b>From:</b>${email.sender}`
      document.querySelector('#recipients').innerHTML = `<b>To:</b> ${email.recipients}`
      document.querySelector('#subject').innerHTML = `<b>Subject: </b>${email.subject}`
      document.querySelector('#timestamp').innerHTML =`<b>Timestamp: </b>${date}`
      document.querySelector('#reply').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary">Reply</button>`
      document.querySelector('#archive').innerHTML =`<button data-email="${email.id}" class="btn btn-sm btn-outline-primary archive">Archive</button>`
      document.querySelector('#body').innerHTML =`${email.body}`   
    })
}})
}))
}) 

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function reply_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'none';
  console.log(email)

fetch(`/emails/${email}`).then(response => response.json()).then(email => {
    // Print email
    // console.log(email)
    // console.log(email.sender)
    let time = new Date(email.timestamp)
    let date =  time.toDateString() + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
  
    // Inserting composition from 1st email
  document.querySelector('#compose-recipients').value = `${email.sender}`;
  document.querySelector('#compose-subject').value = `Re: ${email.subject} `;
  document.querySelector('#compose-body').value = `On ${date} ${email.sender} wrote: ${email.body}`;
  })}

function load_mailbox() {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'none';
  // document.querySelector('#mailbox-heading').style.display = 'block';
  // Show the mailbox name
  // document.querySelector('#mailbox-heading').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`
}

function load_email(email) {
  // Show email and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'block';
  document.querySelector('#archive-view').style.display = 'none';
}
function archive() {
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'none';

    // console.log(email)
    fetch(`/emails/${email}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })
  }

function unarchive() {
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'block';

    // console.log(email)
    fetch(`/emails/${email}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: false
      })
    })
  } 


function archived_view() {
    //moving to archive view
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-ind').style.display = 'none';
  document.querySelector('#archive-view').style.display = 'block';
  }



