import { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom";


//for charts 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DashBoard({ user }){

    //for tree shaking
    ChartJS.register(ArcElement, Tooltip, Legend);


    let [subs,setsubs] = useState({});

    let navigate = useNavigate();

    //if not logged in log in
    if(!user.username){
        navigate("/login");
    }

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



    //stats for displaying
    let count = subs.length;
    let cost = 0;

    let pricePerMonth = 0


    //find earliest renewal
    let earlyRenewal = new Date('01-01-3000');
    let earlySub = {};


    for(let i = 0;i<count;i++){
        cost+= subs[i].price;
        pricePerMonth += (subs[i].price / subs[i].duration )*30 ;

        let temp = new Date(subs[i].startDate);
        //find renewal date
        //
        temp.setDate(temp.getDate() + subs[i].duration);

        if(temp.getTime() < earlyRenewal.getTime()){
            earlyRenewal = temp;
            earlySub = subs[i];
        }

    }

    


    

    


   
    //prepare data for graphs

    let gdata = Array.from(subs);

    




    return(
        <div className="mt-10 flex flex-col items-center gap-10">
            <h1 className="text-3xl font-medium">Dashboard</h1>

            <div className="flex justify-center gap-10  text-2xl  text-white font-thin">
                <div className="p-4 bg-amber-800 rounded-lg">{count} Subscriptions</div>
                <div className="p-4 bg-amber-800 rounded-lg">₹ {cost} Currently Spending</div>
                <div className="p-4 bg-amber-800 rounded-lg">₹ {(pricePerMonth * 12).toFixed(0)} Spent per Year</div>
                <div className="p-4 bg-amber-800 rounded-lg">₹ {pricePerMonth.toFixed(0)} Spent per month</div>
                <div className="p-4 bg-amber-800 rounded-lg">₹ {(pricePerMonth/30).toFixed(0)} Spent per Day</div>
            </div>

            <div className="cgrid">


                <div className="flex flex-col items-center gap-10">
                    <Doughnut data={{
                        labels: gdata.map((sub)=> sub.name),
                        datasets: [{
                            label: "Spends Per Year",
                            data: gdata.map((sub) => (sub.price/sub.duration)*365),
                            backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
                            hoverOffset: 5,
                            hoverBackgroundColor: '#92400E',
                        }]
                    }}/>


                    <h2>Spends per Year</h2>
                </div>


                <div className="flex flex-col items-center gap-10">
                    <Doughnut data={{
                        labels: gdata.map((sub)=> sub.name),
                        datasets: [{
                            label: "Spends Per Month",
                            data: gdata.map((sub) => (sub.price/sub.duration)*30),
                            backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
                            hoverOffset: 5,
                            hoverBackgroundColor: '#92400E',
                        }]
                    }}/>

                    <h2>Spends per Month</h2>
                </div>



                <div className="flex flex-col items-center gap-10">
                    <Doughnut data={{
                        labels: gdata.map((sub)=> sub.name),
                        datasets: [{
                            label: "Spends Per Day",
                            data: gdata.map((sub) => (sub.price/sub.duration)*1),
                            backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
                            hoverOffset: 5,
                            hoverBackgroundColor: '#92400E',
                        }]
                    }}/>

                    <h2>Spends per Day</h2>
                </div>


            </div>



            <div className="flex justify-center bg-green-600 p-10 text-white rounded mb-10 mt-10">
                <div className="flex flex-col gap-10">
                    <h2 className="text-3xl">Earliest renewal</h2>

                    <div>
                        <div>{earlySub.name}</div>
                        <div>Renewal on {earlyRenewal.toDateString()}</div>
                    </div>

                </div>



            </div>


            

            
        </div>
    )
}