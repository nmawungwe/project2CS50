document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
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
    
    document.querySelectorAll('button').forEach(button=>{
      load_email(
       button.onclick = function() {
        //  console.log('clicking')
          showEmail(this.dataset.email) 
       } 
      )
   
     })
    
      
}))
})


  
document.querySelector('#sent').addEventListener('click', () => load_mailbox(
  fetch('/emails/sent').then(response => response.json()).then(emails => {
    // Print emails
    // console.log(emails)

    var messages = emails.map(label).join(' ')
    document.querySelector('#emails-view').innerHTML = messages
    
    function label(email) {
      // const email_id = email.id
      // console.log(email_id)

      return `<button data-email="${email.id}" class="btn btn-secondary email">${email.sender} ${email.subject} ${email.timestamp}</button><br>`
  }
  document.querySelectorAll('button').forEach(button=>{
     button.onclick = function() {

      //  console.log('clicking')

        showEmail(this.dataset.email)
  
     }
   })
})
))


// document.querySelector('#email').addEventListener('click', () => load_email(
//   fetch('/emails/1')
//   .then(response => response.json())
//   .then(email => {
//       // Print email
//       console.log(email);
  
//       // ... do something else with email ...
//   })))







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
  load_mailbox(fetch('/emails/inbox').then(response => response.json()).then(
    emails => {
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
    
    document.querySelectorAll('button').forEach(button=>{
       button.onclick = function() {
        //  console.log('clicking')
          showEmail(this.dataset.email)         
       } 

   
     })
    
      
}));


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  

  // Show the mailbox name
  // document.querySelector('#mailbox-heading').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //Show email list
  

  }


  function showEmail(email) {

      document.querySelector('#emails-view').style.display = 'block';
      document.querySelector('#compose-view').style.display = 'none';
 
      

      fetch(`/emails/${email}`).then(response => response.json()).then(email => {
        // Print email
        console.log(email)
        console.log(email.sender)

        
        
        let time = new Date(email.timestamp)
        let date =  time.toDateString().split(' ').slice(1).join(' ') + ", " + time.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

        // date = time.toTimeString()

        console.log(date)

        
  
        // let time = email.timestamp.toDateString()
        // In JavaScript, a timestamp is the number of milliseconds that have passed since January 1, 1970.

        document.querySelector('#emails-view').innerHTML = `<b>From:</b> ${email.sender}<br><b>To: </b>${email.recipients}<br>
        <b>Subject: </b>${email.subject}<br>
        <b>Timestamp: </b>${date}<br>
        <button class="btn btn-sm btn-outline-primary">Reply</button>
        <hr>
        ${email.body}`

    
        // ... do something else with email ...
    })
  }})