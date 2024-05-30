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
            console.log(subs);
            setsubs(subs.subs);

            return ()=>{
                setsubs({})
            }



        }


        getsubs();
    },[])

    return(
        <div>
            HI I AM ALL SUBS
        </div>
    )
}