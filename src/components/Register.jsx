//used to show sign up page

import { useState } from "react"
import { useNavigate } from "react-router-dom";

//very similar to login 
//just request to different url
export default function Register( { setuser }){
    //used to go to other pages
    let navigate = useNavigate();

    //store data being typed in
    let [formData, setForm] = useState({
        username: "",
        password: "",
        email: "",
    });

    // //to store errmsg to be displayed if no user or wrong passowrd
    // let [errmsg,seterr] = useState("")


    function handleChange(e){
        let temp = formData;

        setForm({
            ...temp,
            [e.target.name]: e.target.value
        });

        // console.log(formData);
    }

    //make post request with credentials to get jwt
    async function sendData(e){

        e.preventDefault();
        

        let res = await fetch("https://submanagebackend.onrender.com/subscription/register",{
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                email: formData.email,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        let result = await res.json();
        setuser(result.user);

        
        localStorage.setItem("token",result.token);
        navigate("/");
        

        
           
        
    }





    return(
        <div className="flex flex-col items-center mt-10 h-1/2 justify-evenly gap-5">
            <h1 className="text-4xl text-pgreen font-semibold">Sign Up</h1>
            <form className="flex flex-col items-center justify-evenly gap-10 h-auto mt-10" onSubmit={(e)=> sendData(e)}> 

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" onChange={(e)=> handleChange(e)}/>
                    
                </div>

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" onChange={(e)=> handleChange(e)}/>
                </div>

                {/* <div className=" text-red-700 text-lg">{errmsg}</div> */}

                <button type="submit" className="rounded p-3 text-lg font-bold bg-pgreen text-white">Sign up</button>

            </form>

        </div>
    )
}