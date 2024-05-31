import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function DashBoard(){

    let [subs,setsubs] = useState({});

    let navigate = useNavigate();

    //makes fetch request
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
            

            //cleanup function
            return ()=>{
                setsubs({})
            }



        }


        getsubs();
    },[]);


    let count = subs.length;
    let cost = 0

    for(let i = 0;i<count;i++){
        cost+= subs[i].price;
    }




    return(
        <div className="mt-10 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-medium">Dashboard</h1>

            <div className="flex justify-center gap-10  text-2xl  text-white font-thin">
                <div className="p-4 bg-amber-800 rounded-lg">{count} Subscriptions</div>
                <div className="p-4 bg-amber-800 rounded-lg">₹ {cost} Spent</div>
            </div>

            
        </div>
    )
}