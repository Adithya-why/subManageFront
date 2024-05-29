import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Login(){
    //used to go to other pages
    let navigate = useNavigate();

    //store data being typed in
    let [formData, setForm] = useState({
        username: "",
        password: ""
    });


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
        console.log(result);

        if(result.login===1){
            localStorage.setItem("token",result.token);
            navigate("/")
        }

        else{
            console.log(result.msg);
        }
    }





    return(
        <div className=" ">
            <h1>Login</h1>
            <form className="" onSubmit={(e)=> sendData(e)}>

                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" onChange={(e)=> handleChange(e)}/>
                </div>


                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" onChange={(e)=> handleChange(e)}/>
                </div>


                <button type="submit">Log in</button>

            </form>

        </div>
    )
}