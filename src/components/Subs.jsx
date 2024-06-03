import { useEffect, useState, useReducer } from "react"
import { Link, useNavigate } from "react-router-dom";
//page for all subs

//shows subs in a tile with options
export default function Subs( { user }){

    // //stupid shit to force component to rerender after deleting a sub
    // const [, forceUpdate] = useReducer(x => x + 1, 0);


    let navigate = useNavigate();

    if(!user.username){
        navigate("/login");
    }


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
            <div className="subgrid m-10">
            
                {subarr}
            </div>


            <div>
                <Link to={"/add"}><button className="newbutton p-2 bg-amber-800 rounded text-white font-medium">Add Subscription</button></Link>
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


    //used to find the expiry date
    //start with purchased date
    //adds duration days to the date
    let expiry =  new Date(sub.startDate);
    expiry.setDate(expiry.getDate() + sub.duration);

    
    //see if sub has expired already
    //changes bg based on it
    let expired = false;
    let bg = "bg-[#84dcc6]";

    let today = new Date();

    if(today.getTime() > expiry.getTime()){
        expired  = true;
        bg = "bg-slate-500"
    }


    //function to handle renew function
    //basically just update the starting date to today
    
    async function renew(){

        //new date created
        let date = new Date();
        var newStart = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
        
        //update with new date
        let res = await fetch("http://localhost:3000/subscription/"+sub._id ,{
            method: "PUT",

            body: JSON.stringify({
                name: sub.name,
                price: sub.price,
                startDate: newStart,
                duration: sub.duration,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),

            }
        });



        let ress = await res.json();
        console.log(ress);


        navigate("/");



    }



    //navigate can actually pass data 
    //and cam be retreived with useLocation hook
    //so update button navigates to /update/id with data

    //the sub object that is being updated is passed to update page form



    return(
        <div className={`h-auto ${bg} text-white rounded-lg flex items-center justify-evenly gap-8`}>

            <h1 className="text-2xl font-bold">{sub.name}</h1>

            <div className="flex justify-center gap-16 basis-2/3 ">


                <div className="flex flex-col items-center gap-2 basis-2/3 text-xl">
                    <div> <span className=" font-semibold text-amber-500">Price:</span>   ₹{sub.price}</div>
                    <div> <span className="font-semibold text-amber-400">Purchased On:</span>  {sub.startDate}</div>
                    <div> <span className="font-semibold text-amber-300">Duration:</span>  {sub.duration} Days</div>
                    <div> <span className="font-semibold text-amber-200">Expires on:</span>  {expiry.toDateString()}</div>
                    {expired ?
                    
                    <div>Expired</div>
                    :
                    <div> </div>
                    
                    }
                </div>



                <div className="flex items-center justify-evenly gap-5">
                    <button className="p-2 bg-[#184e77] rounded text-white font-medium" onClick={deleteSub}>Delete</button>
                    <button className="p-2 bg-[#74c69d] rounded text-white font-medium" onClick={()=>navigate("/update/"+sub._id, {state: {sub}})}>Update</button>
                    <button className="p-2 bg-[#40916c] rounded text-white font-medium" onClick={renew}>Renew</button>
                </div>
            </div>
        </div>
    )
}