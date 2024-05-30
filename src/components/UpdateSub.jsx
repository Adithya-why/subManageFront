import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UpdateSub(){


    //gets the sub being deleted from navigate hook
    //this was passed when coming to this location
    //no need to get id from url and fetch again
    let { state } = useLocation();
    console.log(state.sub);

    //stuff copied from new sub 
    //same logic just prefill data in input and send update request
    let navigate = useNavigate();

    //store data in form
    let [formData, setForm] = useState({
        name: state.sub.name,
        price: state.sub.price,
        startDate: state.sub.startDate,
        duration: state.sub.duration,

    });


    function handleChange(e){
        let temp = formData;

        setForm({
            ...temp,
            [e.target.name]: e.target.value
        });

        // console.log(formData);
    }


    async function sendData(e){
        e.preventDefault();


        //send to login if not logged in
        if(!localStorage.getItem("token")){
            navigate("/login");
        }


        let res = await fetch("http://localhost:3000/subscription/"+state.sub._id ,{
            method: "PUT",

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
        
        navigate("/subscriptions");
    }




    return(
        <div className="flex flex-col items-center mt-10 h-1/2 justify-evenly gap-5">
            <h1 className="text-4xl text-green-600 font-semibold">Update Subscription</h1>
            <form className="flex flex-col items-center justify-evenly gap-10 h-auto mt-10" onSubmit={(e)=> sendData(e)}> 

                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={formData.name} onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="price">Price</label>
                    <input id="price" type="text" name="price" value={formData.price} onChange={(e)=> handleChange(e)}/>
                    
                </div>



                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="purchased">Purchased On</label>
                    <input id="purchased" type="text" name="startDate" value={formData.startDate} onChange={(e)=> handleChange(e)}/>
                    
                </div>


                <div className="flex flex-col items-center justify-evenly text-xl font-medium">
                    <label htmlFor="duration">Duration(in Days)</label>
                    <input id="duration" type="text" name="duration" value={formData.duration} onChange={(e)=> handleChange(e)}/>
                    
                </div>

                

                <button type="submit" className="rounded p-3 text-lg font-bold bg-green-600 text-white">Update</button>

            </form>

        </div>
    )
}

