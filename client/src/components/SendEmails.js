import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const SendEmail = (players) => {
  const form = useRef();


  const sendAllEmails = (e) =>{
    e.preventDefault();
    console.log(players.props);
    players.props.map( (player) => (
        // sendEmail(player.email)
        console.log("sent!")
    ))
  }






  const sendEmail = (email) => {
    var templateParams = {
        to_email: email
    };

    emailjs.send('service_qywuhhg','template_oh5otuh',templateParams, 'user_8zVeV05tOzxgN06cAIfeM')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
  };

  return ( 
    <button className="btn btn-primary btn-lg"onClick={(e) => sendAllEmails(e)}>Send Emails</button>
  );
};

export default SendEmail

