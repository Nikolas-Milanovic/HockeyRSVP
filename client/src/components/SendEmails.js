import React, { useRef, useState} from 'react';
import emailjs from '@emailjs/browser';

const SendEmail = (players) => {
  const form = useRef();
  const [message, setMessage] = useState('');

  const handleMessageChange = event => {
    // access textarea value
    setMessage(event.target.value);
  };

  const sendAllEmails = (e) =>{
    e.preventDefault();
    players.props.props.map( (player) => (
        sendEmail(player.email),
        console.log("sent!")
    ))
  }

  //TODO WHAT IS EFMAIL DOES NOT EXIST 
  const sendEmail = (email) => {
    var templateParams = {
        to_email: email,
        message: message.replace("{{email}}",email)
    };

    emailjs.send('service_qywuhhg','template_oh5otuh',templateParams, 'user_8zVeV05tOzxgN06cAIfeM')
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
        alert('FAILED TO SEND EMAILS...', error);
     });
  };


  //This shoudl happen every saturday 
  //TODO THIS SHOULD HAPPEN EVERY SATURDAY AFTER HOCKEY?
  const clearStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/clear`,
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

  // const addNewGame = async () => {
  //   try {
  //     const date = "xx/yy";
  //     const white = "input";
  //     const black = "input";
  //     //onst status = "Attending";
  //     //const default_status = { status };
  //     const body = { date, white, black };

  //     const response = await fetch("http://localhost:8080/api/history", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });

  //     //console.log(JSON.stringify(default_status));
  //     //console.log(JSON.stringify(body));
  //     //window.location = "/admin";
  //     //fetch call
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }


  return ( 
    <>
    <form>
        <textarea
        id="message"
        name="message"
        value={message}
        onChange={(e)=>handleMessageChange(e)}
        >Some text...</textarea>
    </form>
    <div className="container" style={{paddingLeft: 0}}> 
      <button className="btn btn-primary btn-lg"onClick={(e) => {sendAllEmails(e); clearStatus()}}>Send Emails</button>
    </div>
    </>
  );
};

export default SendEmail

