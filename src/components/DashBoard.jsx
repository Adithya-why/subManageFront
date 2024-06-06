import { useState,useEffect,useRef } from "react"
import { useNavigate } from "react-router-dom";


//for charts 
//need to import seperately for tree shaking
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,
    LinearScale,
    BarElement,
    Title,

     } from "chart.js";



import { Doughnut, Bar } from "react-chartjs-2";

export default function DashBoard({ user }){

    //for tree shaking
    ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
        LinearScale,
        BarElement,Title);


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
    //store things like earliest renewal, most expensive
    let count = subs.length;
    let cost = 0;

    let pricePerMonth = 0


    //find earliest renewal
    let earlyRenewal = new Date('01-01-3000');
    let earlySub = {};


    //find most expensive sub per cycle
    let expSub = {price: 0};


    //most expensive per year
    let expYearMost = {price: 0, duration: 1}
    



    for(let i = 0;i<count;i++){



        //finds total cost and price per month
        cost+= subs[i].price;
        pricePerMonth += (subs[i].price / subs[i].duration )*30 ;



        //most expensive sub
        if(subs[i].price > expSub.price){
            expSub = subs[i];
        }


        //most expensive per year
        if((subs[i].price/subs[i].duration*365) > (expYearMost.price/expYearMost.duration*365)){
            expYearMost = subs[i];
        }


        let temp = new Date(subs[i].startDate);
        //find renewal date
        temp.setDate(temp.getDate() + subs[i].duration);
        if(temp.getTime() < earlyRenewal.getTime()){
            earlyRenewal = temp;
            earlySub = subs[i];
        }

        
    }


    // console.log(expSub);

    


    

    


   
    //prepare data for graphs
    //to use map function
    let gdata = Array.from(subs);

    



    //uses components from react chartjs to display graphs
    return(
        <div className=" w-screen md:w-full mt-10 flex flex-col items-center gap-10">

            <h1 className="text-3xl font-medium">Dashboard</h1>

            <div className="flex justify-center gap-4 text-center flex-col md:flex-row md:gap-10 text-2xl text-white font-thin">
                <div className="p-4 bg-pgreen rounded-lg">{count} Subscriptions</div>
                <div className="p-4 bg-pgreen rounded-lg">₹ {cost} Spending per cycle</div>
                <div className="p-4 bg-pgreen rounded-lg">₹ {(pricePerMonth * 12).toFixed(0)} Spent per Year</div>
                <div className="p-4 bg-pgreen rounded-lg">₹ {pricePerMonth.toFixed(0)} Spent per month</div>
                <div className="p-4 bg-pgreen rounded-lg">₹ {(pricePerMonth/30).toFixed(0)} Spent per Day</div>
            </div>

            <div className="cgrid flex flex-col md:grid ">



            {/* <div className="flex flex-col items-center gap-10">
                    <Doughnut data={{
                        labels: gdata.map((sub)=> sub.name + " " + `(${sub.duration} Days)`),
                        datasets: [{
                            label: "Spends Per Cycle",
                            data: gdata.map((sub) => sub.price),
                            backgroundColor: ['yellow', 'aqua', 'pink', 'lightgreen', 'gold', 'lightblue'],
                            hoverOffset: 5,
                            hoverBackgroundColor: '#92400E',
                        }]
                    }}/>


                    <h2>Spends per Cycle</h2>
                </div> */}


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



            <div className="w-full flex items-center flex-col gap-6 md:justify-center  md:gap-10 md:flex-row p-10 text-white rounded mb-10 mt-10 text-xl">


                <div className="flex flex-col gap-10 bg-green-600 p-10 w-full md:w-1/3 h-full">
                    <h2 className="text-3xl">Earliest renewal</h2>

                    <div> 
                        <div>{earlySub.name}</div>
                        <div>Renewal on {earlyRenewal.toDateString()}</div>
                    </div>

                </div>



                <div className="flex flex-col gap-10 bg-green-600 p-10 w-full md:w-1/3 h-full">
                    <h2 className="text-3xl">Most Expensive Subscription per cycle</h2>

                    <div>
                        <div>{expSub.name}</div>
                        <div>₹{expSub.price}</div>
                    </div>

                </div>




                <div className="flex flex-col gap-10 bg-green-600 p-10 w-full md:w-1/3 h-full">
                    <h2 className="text-3xl">Most Expensive Subscription per Year</h2>

                    <div>
                        <div>{expYearMost.name}</div>
                        <div>₹{expYearMost.price} for {expYearMost.duration} days</div>
                        <div>₹{(expYearMost.price/expYearMost.duration*365).toFixed(0) } for a year(approx)</div>
                    </div>

                </div>





            </div>


            <div className="bgr w-full flex items-center md:justify-center">


                <Bar data={{
                    labels: gdata.map((sub)=> sub.name + " " + `(${sub.duration} Days)`),
                    datasets: [{
                        label: "Subscriptions by Price per cycle",
                        data: gdata.map((sub) => sub.price),
                        backgroundColor: "#7bdff2",
                        
                    }]
                }} className="w-screen h-4/5"/>
            </div>


            

            
        </div>
    )
}