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
       <div className="navbar dm-sans-class w-full h-full bg-amber-800 flex items-center justify-evenly">

            <div className=" text-3xl text-white text-center basis-2/3"><Link to={"/"}>Subman</Link></div>


                {!user.username ?
                
                <div className=" text-white flex items-center gap-8 basis-1/3">
                    <Link to={"/login"}><button className=" p-2 bg-green-600 rounded">Log in</button></Link>
                    <Link to={"/register"}><button className="p-2 bg-green-600 rounded">Sign up</button></Link>
                </div>
                

                :

                <div className="basis-1/3 flex items-center justify-evenly">
                    <button className=" p-2 bg-green-600 rounded text-white" onClick={logout}>Logout</button>

                    <Link to={"/subscriptions"}><button className=" p-2 bg-green-600 rounded text-white">View Subs</button></Link>

                    <div className="text-white text-lg font-medium">Welcome {user.username}</div>
                
                
                </div>

                

                }
       </div>
    )
}