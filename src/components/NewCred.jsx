import { useLocation,useNavigate } from "react-router-dom";
import { startTransition, useState } from "react";


export default function NewCred(){



    //gets the sub for which credential is entered from navigate hook
    //this was passed when coming to this location
    //no need to get id from url and fetch again


    let { state } = useLocation();
    
    //stuff copied from new sub 
    //same logic just prefill data in input and send update request
    let navigate = useNavigate();

    //store data in form
    let [formData, setForm] = useState({
        loginid: "",
        passwordHint: "",
        sub: state.sub._id,
    });


    function handleChange(e){
        let temp = formData;

        setForm({
            ...temp,
            [e.target.name]: e.target.value
        });

       
    }

    //makes create cred request
    //data in body
    async function sendData(e){
        e.preventDefault();


        //send to login if not logged in
        if(!localStorage.getItem("token")){
            navigate("/login");
        }


        let res = await fetch("https://submanagebackend.onrender.com/subscription/cred" ,{
            method: "POST",

            body: JSON.stringify({
                loginid: formData.loginid,
                passwordHint: formData.passwordHint,
                sub: formData.sub,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),

            }
        });


        let ress = await res.json();
        // console.log(ress);
        
        navigate("/subscriptions");
    }




    return(
        <div className="flex flex-col items-center mt-10 h-1/2 justify-evenly gap-5">
            <h1 className="text-4xl text-pgreen font-semibold">Add Credential to {state.sub.name}</h1>
            <form className="flex flex-col items-center justify-evenly gap-10 h-auto mt-10" onSubmit={(e)=> sendData(e)}> 

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="name">Login ID(Username, email, phone)</label>
                    <input id="name" type="text" name="loginid" value={formData.loginid} onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="price">Password Hint </label>
                    <input id="price" type="text" name="passwordHint" value={formData.passwordHint} onChange={(e)=> handleChange(e)}/>
                    
                </div>



                

                <button type="submit" className="rounded p-3 text-lg font-bold bg-pgreen text-white">Add Credential</button>

            </form>

        </div>
    )
}