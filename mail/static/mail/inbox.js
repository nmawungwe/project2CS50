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
      return `<button data-email="${email.id}" class="btn btn-sm btn-outline-primary email">${email.sender} ${email.subject} ${email.timestamp}</button><br>`
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
      return `<li>${email.recipients} ${email.subject} ${email.timestamp}</li>`
  }}
)))


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
  load_mailbox(fetch('/emails/inbox').then(response => response.json()).then(emails => {
      // Print emails
      // console.log(emails)
    // ... do something else with emails ...
    var messages = emails.map(label).join(' ')
    document.querySelector('#emails-view').innerHTML = messages
    
    function label(email) {
      return `<li>${email.sender} ${email.subject} ${email.timestamp}</li>`
    }   
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

  function load_email(email) {
  
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

        document.querySelector('#emails-view').innerHTML = `<b>Sender:</b> ${email.sender}<br><b>Body:</b>${email.body}`
    
        // ... do something else with email ...
    })
  }})