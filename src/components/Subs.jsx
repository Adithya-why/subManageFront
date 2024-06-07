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
            let res = await fetch("https://submanagebackend.onrender.com/subscription/", {
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

            <h1 className="text-3xl text-center mt-4 md:mt-10  font-semibold md:font-thin">Your Subscriptions</h1>
            <div className="subgrid mt-10 md:m-10">
            
                {subarr}
            </div>


            <div>
                <Link to={"/add"}><button className="newbutton p-2 bg-sea rounded text-white font-medium">Add Subscription</button></Link>
            </div>
        </div>
    )
}






//comp to show a single tile 
//has options for delete and update
function SubTile({ sub }){

    //to store cred information
    //id stored for deletion
    //shown only when click see creds

    let [creds,setcreds] = useState({});

    let navigate = useNavigate();


    //delete request made with _id
    async function deleteSub(){
        let id = sub._id;

        let res = await fetch("https://submanagebackend.onrender.com/subscription/"+id, {
            method: "DELETE",

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),
            }

        });


        let ress = await res.json();
        // console.log(ress);

        
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
    let bg = "bg-pgreen";

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
        let res = await fetch("https://submanagebackend.onrender.com/subscription/"+sub._id ,{
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
        // console.log(ress);


        navigate("/");



    }



    //function to view credentials

    async function viewCred(){


        //get cred of this sub with id
        let cred = await fetch("https://submanagebackend.onrender.com/subscription/cred/"+ sub._id, {
            method: "GET",

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),
            }



        });


        let res = await cred.json();


        //if no credentials then show no credentials
        if(!res.cred){
            setcreds({
                loginid: "No Credentials",
                passwordHint: "No password hint"
            });
            return
        }

        //create new object with the credentials and save to stat
        let temp = {
            loginid: res.cred.loginid,
            passwordHint: res.cred.passwordHint,
            id: res.cred._id,
        }
        

        setcreds(temp);
    }



    //function to delete credential

    async function delCred(){

        if(!creds.id){
            return
        }
        
        let res = await fetch("https://submanagebackend.onrender.com/subscription/cred/"+ creds.id, {
            method: "DELETE",

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),
            }

        });

        let ress = await res.json();

        // console.log(ress);
        navigate("/");
    }


    //navigate can actually pass data 
    //and cam be retreived with useLocation hook
    //so update button navigates to /update/id with data


    //same for add cred
    //sub object is passed to new cred page
    //so cred is added to that specific sub

    //the sub object that is being updated is passed to update page form



    return(
        <div className={`subbb w-3/4 h-5/6 md:w-full md:h-auto ${bg} text-white rounded-lg`}>

            <h1 className="text-3xl font-medium">{sub.name}</h1>

            <div className="flex flex-col items-center gap-8 ">


                <div className="flex flex-col items-center gap-2 basis-2/3 text-xl font-light">
                    <div> <span className=" text-black font-extralight">Price:</span>   ₹{sub.price}</div>
                    <div> <span className="text-black font-extralight">Purchased On:</span>  {sub.startDate}</div>
                    <div> <span className="text-black font-extralight">Duration:</span>  {sub.duration} Days</div>
                    <div> <span className="text-black font-extralight">Expires on:</span>  {expiry.toDateString()}</div>
                    {expired ?
                    
                    <div>Expired</div>
                    :
                    <div> </div>
                    
                    }

                    {

                    //used to check if creds exist
                    //if yes render them else empty div
                    
                    Object.keys(creds).length !== 0 ? 

                    <div className="flex flex-col items-center gap-1">
                        <div>Login ID : {creds.loginid}</div>
                        <div>Password Hint : {creds.passwordHint}</div>

                        <button className="p-1 bg-[#d90429] rounded text-white font-medium text-sm" onClick={delCred}>Delete Credential</button>
                    </div>

                    :

                    <div></div>


                    }
                </div>



                <div className="flex flex-col items-center justify-evenly gap-5">

                    <div className="flex items-center justify-evenly gap-5">
                        <button className="p-2 bg-[#d90429] rounded text-white font-medium" onClick={deleteSub}>Delete</button>
                        <button className="p-2 bg-lbrown rounded text-white font-medium" onClick={()=>navigate("/update/"+sub._id, {state: {sub}})}>Update</button>
                        <button className="p-2 bg-lbrown rounded text-white font-medium" onClick={renew}>Renew</button>
                    </div>

                    <div className="flex items-center justify-evenly gap-5">
                        <button className="p-2 bg-lbrown rounded text-white font-medium" onClick={()=>navigate("/cred" ,{state: {sub}})}>Add credentials</button>
                        <button className="p-2 bg-lbrown rounded text-white font-medium" onClick={viewCred}>View Credentials</button>
                    </div>

                </div>
            </div>
        </div>
    )
}