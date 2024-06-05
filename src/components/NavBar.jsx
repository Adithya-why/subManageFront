import { Link } from "react-router-dom"
//shown in all pages

export default function NavBar({ user, setuser }){


    //sets global app user object to {}
    //removes auth jwt
    function logout(){
        setuser({});

        localStorage.removeItem("token");
    }

    //has links to other pages
    //if user is logged in shows logout and other stuff
    //if not shows login and sign up
    return(
       <div className="navbar dm-sans-class w-full h-full bg-[#7bdff2] flex items-center justify-evenly">

            <div className=" text-3xl text-white text-center basis-2/3"><Link to={"/"}>Subman</Link></div>


                {!user.username ?
                
                <div className="hidden text-white md:flex items-center gap-8 basis-1/3">
                    <Link to={"/login"}><button className=" p-2 bg-[#d4a373] text-white rounded">Log in</button></Link>
                    <Link to={"/register"}><button className="p-2 bg-[#d4a373] text-white rounded">Sign up</button></Link>
                </div>

                //mobile stuff
                

                :

                <div className="hidden basis-1/3 md:flex items-center justify-evenly">
                    <button className=" p-2 bg-[#d4a373] rounded text-white" onClick={logout}>Logout</button>

                    <Link to={"/subscriptions"}><button className=" p-2 bg-[#d4a373] rounded text-white">View Subs</button></Link>

                    <Link to={"/dashboard"}><button className=" p-2 bg-[#d4a373] rounded text-white">Dashboard</button></Link>

                    <div className="text-[#636363] text-lg font-medium ">Welcome {user.username}</div>
                
                
                </div>

                

                }
       </div>
    )
}