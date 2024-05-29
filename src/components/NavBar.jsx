import { Link } from "react-router-dom"


export default function NavBar(){



    return(
       <div className="navbar dm-sans-class w-full h-full bg-amber-800 flex items-center justify-evenly">

            <div className=" text-3xl text-white text-center basis-2/3"><Link to={"/"}>Subman</Link></div>

            <div className=" text-white flex items-center gap-8 basis-1/3">
                <Link to={"/login"}><button className=" p-2 bg-green-600 rounded">Log in</button></Link>
                <Link to={"/register"}><button className="p-2 bg-green-600 rounded">Sign up</button></Link>
            </div>
       </div>
    )
}