import { Link } from "react-router-dom"

export default function DesignCard({ user }){
    

    //used for landing page 


    //gets uer tot determin where clicking get started button leads to
    //sets where to be redirected based on login or not
    
    let startPath = ""
    if(user.username){
        startPath="/subscriptions"
    }else{
        startPath="/login"
    }
    

    return(
        <div className=" dc flex flex-col items-center w-full h-full pt-20 gap-10 bg-sandy text-green-600">
            <div className="dcc text-6xl text-center w-full basis-1/2 p-4 leading-snug md:leading-none md:basis-auto md:w-2/3 font-thin">Manage all your <span className="w-full text-[#5aa9e6] text-center font-normal">Subscriptions</span> in one place</div>

            <div className="text-xl font-normal text-black w-1/2 text-center">
                Subman allows to monitor and track all your subscriptions and memberships in one place and summarise them in the dashboard
            </div>


            <div>
                <button className=" rounded-3xl p-4 text-lg font-bold bg-[#60d394] text-white"><Link to={startPath}>Get started</Link></button>
            </div>


            <a href="https://www.flaticon.com/free-icons/menu-bar" title="menu bar icons">Menu bar icons created by Alfan Subekti - Flaticon</a>
        </div>
    )
}