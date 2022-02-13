import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const SendEmail = () => {
  const form = useRef();

  var templateParams = {
    to_email: "nikolasm87@hotmail.com"
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send('service_qywuhhg','template_oh5otuh',templateParams, 'user_8zVeV05tOzxgN06cAIfeM')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
  };

  return (
    <button onClick={(e) => sendEmail(e)}>Send Emails</button>
  );
};

export default SendEmail

