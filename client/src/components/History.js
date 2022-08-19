import { useEffect, useState } from "react";

const History = () => {
    const [displayHistory, setdisplayHistory] = useState(false);
    return(
        <div className="attendanceStyling">
        <div className="historyOverview">
            <h5 style={{marginRight:50}}>
                Prev Game: <b>(White) 6</b> - 4 (Black) 
            </h5>
            <button
                type="button"
                className={`btn btn-outline-success ${displayHistory === true ? "active" : ""}`}
                onClick = { (e)=>(  setdisplayHistory(!displayHistory))}
                >
                History 
            </button>
        </div>
       
        {displayHistory && <table class="table table-sm">
            <thead>
            <tr>
                <th scope="col">Total Wins</th>
                <th scope="col">White (1)</th>
                <th scope="col">Black (4)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">XX/YY</th>
                <td>6</td>
                <td>4</td>
            </tr>
            </tbody>
        </table> }
        </div>
    )
}

export default History;