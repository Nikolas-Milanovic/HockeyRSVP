import { useEffect, useState } from "react";
import History from "./History";

const Attendance = (players) => {
    const [attendance,setAttendance] = useState([1,0,0,0]);
    
    var createAttendance=[0,0,0,0];
    console.log(players);

    const getAttendance = () =>{
         //[Attending,Tentative,Not Attending, Pending Response]
        //console.log(players);
        //console.log(">>>",players.props.length);
        //console.log(">>>",players[0].props.status);
        for(var i=0; i<players.props.length; i++){
            if(players.props[i].status==="Attending"){
                createAttendance[0]++;
            }
            else if(players.props[i].status==="Tentative"){
                createAttendance[1]++;
            }
            else if(players.props[i].status==="Not Attending"){
                createAttendance[2]++;
            }
            else{
                createAttendance[3]++;
            }
        }
        //console.log(createAttendance);
        //return () => createAttendance;
    }

    useEffect(()=>{
        //console.log(players);
        //var createAttendance = getAttendance;
        
        getAttendance();
        //console.log(createAttendance);
        //var attend=2;
        setAttendance(createAttendance);
    }, [players]);


    return(
        <div className="attendanceStyling">
            <History/>
        <h5 className="text-center mb-0">
            Attending: {attendance[0]} | Tentative: {attendance[1]} | Not Attending: {attendance[2]} | Pending Response: {attendance[3]} 
        </h5>
        </div>
    )
};

export default Attendance;