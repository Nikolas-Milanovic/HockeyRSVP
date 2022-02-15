import { useEffect, useState } from "react";


const Attendance = (players) => {
    const [attendance,setAttendance] = useState([1,0,0,0]);


    const getAttendance = () =>{
        var createAttendance=[0,0,0,0]; //[Attending,Tentative,Not Attending, Pending Response]
        console.log(players);
        console.log(">>>",players.props.length);
        //console.log(">>>",players[0].props.status);
        // for(var i=0; i<players.props.length; i++){
        //     if(players.props[i].status==="Attending"){
        //         createAttendance[0]++;
        //     }
        //     else if(players.props[i].status==="Tentative"){
        //         createAttendance[1]++;
        //     }
        //     else if(players.props[i].status==="Not Attending"){
        //         createAttendance[2]++;
        //     }
        //     else{
        //         createAttendance[3]++;
        //     }
        // }
        console.log(createAttendance);
        setAttendance(createAttendance);
    }

    useEffect(()=>{
        console.log(players);
        getAttendance();
    }, []);


    return(
        <h5 className="text-center mt-4 mb-3">
            Attending: {attendance[0]} | Tentative: {attendance[1]} | Not Attending: {attendance[2]} | Pending Response: {attendance[3]} 
        </h5>
    )
};

export default Attendance;