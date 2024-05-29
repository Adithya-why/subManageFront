export default function DesignCard(){




    return(
        <div className=" dc flex flex-col items-center w-full h-full pt-20 gap-10  bg-[#F5EEC8] text-green-600">
            <div className="text-6xl text-center w-2/3">Manage all your subscriptions in one place</div>

            <div className="text-xl font-normal text-amber-800 w-1/2 text-center">
                Subman allows to monitor and track all your subscriptions and memberships in one place and summarise them in the dashboard
            </div>


            <div>
                <button className=" rounded-3xl p-4 text-lg font-bold bg-green-600 text-white">Get started</button>
            </div>
        </div>
    )
}