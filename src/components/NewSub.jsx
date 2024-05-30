//page to add new sub
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//shows form to create a new sub
export default function NewSub(){

    let navigate = useNavigate();

    //store data in form
    let [formData, setForm] = useState({
        name: "",
        price: 0,
        startDate: "",
        duration: 0,

    });

    //store data as it is being typed in
    function handleChange(e){
        let temp = formData;

        setForm({
            ...temp,
            [e.target.name]: e.target.value
        });

        // console.log(formData);
    }

    //send data to created sub
    //uses jwt 
    //if not logged in redirects
    async function sendData(e){
        e.preventDefault();


        //send to login if not logged in
        if(!localStorage.getItem("token")){
            navigate("/login");
        }


        let res = await fetch("http://localhost:3000/subscription/",{
            method: "POST",

            body: JSON.stringify({
                name: formData.name,
                price: formData.price,
                startDate: formData.startDate,
                duration: formData.duration,
            }),

            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": localStorage.getItem("token"),

            }
        });


        let ress = await res.json();
        // console.log(ress);
        navigate("/")
    }




    return(
        <div className="flex flex-col items-center mt-10 h-1/2 justify-evenly gap-5">
            <h1 className="text-4xl text-green-600 font-semibold">New Subscription</h1>
            <form className="flex flex-col items-center justify-evenly gap-10 h-auto mt-10" onSubmit={(e)=> sendData(e)}> 

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="price">Price</label>
                    <input id="price" type="text" name="price" onChange={(e)=> handleChange(e)}/>
                    
                </div>



                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="purchased">Purchased On</label>
                    <input id="purchased" type="text" name="startDate" onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="duration">Duration(in Days)</label>
                    <input id="duration" type="text" name="duration" onChange={(e)=> handleChange(e)}/>
                    
                </div>

                

                <button type="submit" className="rounded p-3 text-lg font-bold bg-green-600 text-white">Add</button>

            </form>

        </div>
    )
}