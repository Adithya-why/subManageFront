import { useState } from "react";
import { Link } from "react-router-dom"

//import image
import menuLogo from '../assets/menu-bar.png';

//shown in all pages

export default function NavBar({ user, setuser }){





    //responsive stuff 
    //used to show burger menu if on mobile screens

    let [mobile,setmobile] = useState(false);


    if(screen.width < 1024){
        if(mobile==false){
            setmobile(true);
        }
    }



    //used to determine whether mobile menu is shown
    let [mobileMenu, setMobileMenu] = useState('hidden')


    //reverses state of mobileMEnu
    //shows if hidden, hidden if shown already
    function showOrHideMenu(){
        if(mobileMenu=='hidden'){
            setMobileMenu('flex');
        }

        else{
            setMobileMenu('hidden');
        }
    }


    


    //sets global app user object to {}
    //removes auth jwt
    function logout(){
        setuser({});

        localStorage.removeItem("token");
    }

    //has links to other pages
    //if user is logged in shows logout and other stuff
    //if not shows login and sign up



    //four cases

    //logged out mobile
    //logged out 

    //logged in mobile
    //logged in


    //for mobile versions menu icon is shown
    return(
       <div className="navbar dm-sans-class w-full h-full bg-[#7bdff2] flex items-center justify-evenly">

            <div className=" text-3xl text-white text-center basis-2/3"><Link to={"/"}>Subman</Link></div>


                {!user.username ?
                


                //mobile stuff
                //shows menu logo
                //other parts shown when clicked

                //if logged out and in mobile
                mobile ?
                
                
                <div>
                    <div className=" w-10 h-10" onClick={()=> showOrHideMenu()}><img src={menuLogo}/></div>
                    

                    
                    <div 
                    className={`w-full h-1/4 absolute top-[5rem] left-0 flex flex-col items-center justify-center gap-5 bg-black opacity-80 ${mobileMenu}`}
                    >
                    <Link to={"/login"}><button className=" p-2 bg-[#d4a373] text-white rounded">Log in</button></Link>
                    <Link to={"/register"}><button className="p-2 bg-[#d4a373] text-white rounded">Sign up</button></Link>
                    </div>



                </div>

                :

                //if loggeed out but not on mobile
                <div className="hidden text-white md:flex items-center gap-8 basis-1/3">
                    <Link to={"/login"}><button className=" p-2 bg-[#d4a373] text-white rounded">Log in</button></Link>
                    <Link to={"/register"}><button className="p-2 bg-[#d4a373] text-white rounded">Sign up</button></Link>
                </div>

                

                

                :
                //if logged in and in mobile



                mobile ?
                


                <div>
                    <div className=" w-10 h-10" onClick={()=> showOrHideMenu()}><img src={menuLogo}/></div>
                    

                    
                    <div 
                    className={`w-full h-1/4 absolute top-[5rem] left-0 flex flex-col items-center justify-center gap-5 bg-black opacity-80 ${mobileMenu}`}
                    >


                        <button className=" p-2 bg-[#d4a373] rounded text-white" onClick={logout}>Logout</button>

                        <Link to={"/subscriptions"}><button className=" p-2 bg-[#d4a373] rounded text-white">View Subs</button></Link>

                        <Link to={"/dashboard"}><button className=" p-2 bg-[#d4a373] rounded text-white">Dashboard</button></Link>

                        <div className="text-[#636363] text-lg font-medium ">Welcome {user.username}</div>
                    
                    </div>



                </div>


                :




                //if logged in but not in mobile
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