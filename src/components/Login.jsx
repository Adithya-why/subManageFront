import { useState } from "react"
import { useNavigate } from "react-router-dom";
//used to show login form
//gets user data , makes POST req and gets jwt to store in ls

export default function Login( { setuser }){
    //used to go to other pages
    let navigate = useNavigate();

    //store data being typed in
    let [formData, setForm] = useState({
        username: "",
        password: ""
    });

    //to store errmsg to be displayed if no user or wrong passowrd
    //errmsg is returned from backend and store here
    let [errmsg,seterr] = useState("")



    //stores formdata as it is being typed in
    function handleChange(e){
        let temp = formData;

        setForm({
            ...temp,
            [e.target.name]: e.target.value
        });

        // console.log(formData);
    }

    //make post request with credentials to get jwt
    //if successfull store jwt in ls and redirect
    //if not show errmsg
    async function sendData(e){

        e.preventDefault();
        

        let res = await fetch("http://localhost:3000/subscription/login",{
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        });

        let result = await res.json();
        // console.log(result);

        if(result.login===1){
            setuser(result.user);
            localStorage.setItem("token",result.token);
            navigate("/")
        }

        else{
            // console.log(result.msg);
            seterr(result.msg);
        }
    }





    return(
        <div className="flex flex-col items-center mt-10 h-1/2 justify-evenly gap-5">
            <h1 className="text-4xl text-green-600 font-semibold">Login</h1>
            <form className="flex flex-col items-center justify-evenly gap-10 h-auto mt-10" onSubmit={(e)=> sendData(e)}> 

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" onChange={(e)=> handleChange(e)}/>
                </div>

                <div className=" text-red-700 text-lg">{errmsg}</div>

                <button type="submit" className="rounded p-3 text-lg font-bold bg-green-600 text-white">Log in</button>

            </form>

        </div>
    )
}