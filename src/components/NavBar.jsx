export default function NavBar(){



    return(
       <div className="navbar dm-sans-class w-full h-[9%] bg-amber-800 flex items-center justify-evenly">

            <div className=" text-3xl text-white text-center basis-2/3">Subman</div>

            <div className=" text-white flex items-center justify-evenly basis-1/3">
                <button>Log in</button>
                <button>Sign up</button>
            </div>
       </div>
    )
}