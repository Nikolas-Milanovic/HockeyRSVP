import React, { useEffect, useRef, useState} from 'react';
import emailjs from '@emailjs/browser';

const SendEmail = (players) => {
  const form = useRef();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('RSVP Saturday Morning Hockey');

  var allEmailsSent=true;
  const baseURL = 
    process.env.NODE_ENV ==='production'
    ? "https://mississaugaoldtimers.com/api"  
    : "http://localhost:8080/api";

  const handleMessageChange = event => {
    // access textarea value
    setMessage(event.target.value);
  };

  // const successAlert = () => {
  //   if(allEmailsSent){
  //     alert('✅✅✅ All emails SUCCESSFULLY sent ✅✅✅')
  //   }
  //   allEmailsSent=true;
  // }

  const sendAllEmails = (e) =>{
    e.preventDefault();
    const confirmation = prompt('Are you sure you are ready to send? Type "yes" to continue or "no" to cancel:');
    if(confirmation==="yes" || confirmation==="yes " || confirmation==="Yes" || confirmation==="Yes "){
      players.props.map( (player) => (
        //console.log("WHAT IS GOING ON",message.replace("{{EMAIL}}",player.email)),
        sendEmail(player.email)
        //console.log("sent: ",player.email)
      ))
    }
  }

  const sendEmail = (email) => {
    const temp = message.replace("{{invite}}","https://mississaugaoldtimers.com/invite/?email="+email)
    //console.log(temp)
    var templateParams = {
        subject: subject,
        to_email: email,
        message: temp
    };

    emailjs.send('service_qywuhhg','template_oh5otuh',templateParams, 'user_8zVeV05tOzxgN06cAIfeM')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
        console.log("allEmailsSent",allEmailsSent);
        allEmailsSent=false;
        console.log("allEmailsSent",allEmailsSent);
        console.log("EMAIL",email);
        alert('❌❌❌ Failed to send email to ' + email +'❌❌❌');
     });
  };


  //This shoudl happen every saturday 
  //TODO THIS SHOULD HAPPEN EVERY SATURDAY AFTER HOCKEY?
  const clearStatus = async () => {
    try {
      const response = await fetch(
        baseURL+`/clear`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      //window.location = `/admin/`;
    } catch (err) {
      console.error(err.message);
    }
    setMessage(''); 
  };

 

  return ( 
    <>
    <form>
      <input
          type="text"
          value={subject}
          className="form-control"
          placehoder="Subject"
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <div style={{marginTop: 10}}></div>
        <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e)=>handleMessageChange(e)}
        >Some text...</textarea>
    </form>
    <div className="container" style={{paddingLeft: 0}}> 
      <button className="btn btn-primary btn-lg"onClick={(e) => {sendAllEmails(e);}}>Send Emails</button>
    </div>
    </>
  );
};

export default SendEmail

