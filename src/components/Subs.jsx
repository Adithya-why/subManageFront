import { useEffect, useState, useReducer } from "react"
import { Link, useNavigate } from "react-router-dom";
//page for all subs

//shows subs in a tile with options
export default function Subs(){

    // //stupid shit to force component to rerender after deleting a sub
    // const [, forceUpdate] = useReducer(x => x + 1, 0);


    let navigate = useNavigate();


    //fectches all subs  and stores them
    let [subs,setsubs] = useState({})


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
    },[])


    let subarr = []
    //stores every sub tile in array to display
    for(let i = 0;i<subs.length;i++){
        let ele = subs[i];
        subarr.push(<SubTile sub={ele} key={i}/>)
    }

    return(
        <div>
            <div className="subgrid">
            
                {subarr}
            </div>


            <div>
                <Link to={"/add"}><button className="newbutton p-2 bg-green-600 rounded text-white font-medium">Add Subscription</button></Link>
            </div>
        </div>
    )
}






//comp to show a single tile 
//has options for delete and update
function SubTile({ sub }){

    

    let navigate = useNavigate();


    //delete request made with _id
    async function deleteSub(){
        let id = sub._id;

        let res = await fetch("http://localhost:3000/subscription/"+id, {
            method: "DELETE",

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),
            }

        });


        let ress = await res.json();
        console.log(ress);

        
        navigate("/")
    }


    //navigate can actually pass data 
    //and cam be retreived with useLocation hook
    //so update button navigates to /update/id with data

    //the sub object that is being updated is passed to update page form



    return(
        <div className="mt-10 h-auto bg-slate-100 rounded-lg flex flex-col items-center justify-evenly">
            <h1 className="text-2xl">{sub.name}</h1>

            <div className="flex flex-col items-center gap-5">
                <div>Price:  ₹{sub.price}</div>
                <div>Purchased On: {sub.startDate}</div>
                <div>Duration: {sub.duration} Days</div>
                <button className="p-2 bg-red-700 rounded text-white font-medium" onClick={deleteSub}>Delete</button>
                <button className="p-2 bg-red-700 rounded text-white font-medium" onClick={()=>navigate("/update/"+sub._id, {state: {sub}})}>Update</button>
            </div>
        </div>
    )
}