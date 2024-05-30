import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
//page for all subs
export default function Subs(){


    let navigate = useNavigate();

    let [subs,setsubs] = useState({})

    useEffect(()=>{
        //get all subs

        //if not logged in go to login page
        if(!localStorage.getItem("token")){
            navigate("/login");
        }
        async function getsubs(){
            let res = await fetch("http://localhost:3000/subscription/", {
                method: "GET",

                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": localStorage.getItem("token"),
                }
            });

            let subs = await res.json();
            // console.log(subs);
            setsubs(subs.subs);

            return ()=>{
                setsubs({})
            }



        }


        getsubs();
    },[])


    let subarr = []

    for(let i = 0;i<subs.length;i++){
        let ele = subs[i];
        subarr.push(<SubTile sub={ele} key={i}/>)
    }

    return(
        <div className="subgrid">
        
            {subarr}
        </div>
    )
}






//comp to show a single tile 

function SubTile({ sub }){



    return(
        <div className="mt-10 h-full bg-slate-100 rounded-lg flex flex-col items-center justify-evenly">
            <h1 className="text-2xl">{sub.name}</h1>

            <div className="flex flex-col items-center">
                <div>Price:  ₹{sub.price}</div>
                <div>Purchased On: {sub.startDate}</div>
                <div>Duration: {sub.duration} Days</div>
            </div>
        </div>
    )
}