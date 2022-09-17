# HockeyRSVP

This is a web application I built to assist my father with hosting weekly hockey games. The main objective is to easily track who will be attending this weeks game. This is important as if there are not enough players for this weeks game, players can reach out to friends who may want to join. This is where the guest feature is applicable. Attendees can add up to 4 guests. Along with tracking participant attendance, you can also view and updpdate the previous game scores.  


_CUSTOMER JOURNEY_

1) **Admin logs in.** The password is stored server side. Authentication is confirmed by matching the entered password with server side enviroment variable.  

<img width="1211" alt="image" src="https://user-images.githubusercontent.com/59632554/190836404-ee738609-e917-4fb3-b566-e3828e04b68a.png">

Once the password is confirmed, admin has access. 

<img width="1121" alt="image" src="https://user-images.githubusercontent.com/59632554/190838437-d304c631-7ad4-480a-86a0-31aa71b82def.png">

2) **Admin can then add participants via their email**. Emails are sent to using api call to node js serve and stored in PostgreSQL databse.

<img width="1058" alt="image" src="https://user-images.githubusercontent.com/59632554/190836622-06ff9c1b-1fdd-4d13-b1c2-5d1067675ca1.png">
<img width="1058" alt="image" src="https://user-images.githubusercontent.com/59632554/190836643-12ee0bbf-c5c7-4715-bb53-4c7d733aeab9.png">

If the participant is a goalie, we can change their position by clicking the button on the far left.
We can also toggle the button on the right to indicate if the participant has paid. 

<img width="1048" alt="image" src="https://user-images.githubusercontent.com/59632554/190836713-c09412df-7519-46f9-a088-7d93ccdfaa5e.png">

3) **Admin can then create an email to send to all participants.** The admin can add a subject line and write the email. Each participant recieves a unique URL invite. This is accomplished by replacing the reserved text **{{invite}}** with the particpants unique URL. 
<img width="1049" alt="image" src="https://user-images.githubusercontent.com/59632554/190836885-6e6a80ac-767a-4fdc-bc2f-ed624a1836ae.png">

Error dettection will flag emails that are invalid by creaitng a pop up alert:

<img width="468" alt="image" src="https://user-images.githubusercontent.com/59632554/190837654-00aeaa83-2274-48a9-aff1-15a1bb5f847e.png">

4) **Participants then recieve an email with their unqiue URL invite.** This is accomplished using a third party package called EmailJS.

<img width="1221" alt="image" src="https://user-images.githubusercontent.com/59632554/190837436-9f681f22-06f8-40a0-90c2-a57302081837.png">

**5) Once you click on the link it directs you to the invite page**. Here you can indicate your status by clicking either ["attending","tentative","not attending"]. Additonally, you can add up to four guests. 

**You can also view the other participant's status and the total number of attendees.**
<img width="1156" alt="image" src="https://user-images.githubusercontent.com/59632554/190837787-a38906c1-9c8f-46b5-a30a-12b61be31ea3.png">

6) **Additonally, you can quickly see the score for the previous game and click on the "View Game Log" button for more information.** Once clicked you can see the scores of all the previous games played and the upcoming game date. 
<img width="1141" alt="image" src="https://user-images.githubusercontent.com/59632554/190837816-604fdecb-2c7e-4ef8-8eab-ac20a555a473.png">

To make a change to the previous game score, click the edit button. <img width="85" alt="image" src="https://user-images.githubusercontent.com/59632554/190837919-cd1d3720-0c88-44ee-a163-7d0b9f4fdaf0.png">

This will create popups to input the new data:

<img width="462" alt="image" src="https://user-images.githubusercontent.com/59632554/190837956-025b59f8-9bfa-4f4c-b32d-6bfc65087fc9.png">
<img width="463" alt="image" src="https://user-images.githubusercontent.com/59632554/190837970-3e3de46c-2618-4c4c-872f-58e1a3934eef.png">

If there is bad input, such as text instead of numbers, a "Bad Input" alert will appear: 

<img width="457" alt="image" src="https://user-images.githubusercontent.com/59632554/190838010-4412e342-d0b7-49d6-87a2-d0f761c5c60a.png">




