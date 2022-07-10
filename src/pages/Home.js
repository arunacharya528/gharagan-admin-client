import React from "react"
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <div className="text-6xl font-semibold">Gharagan Admin Control</div>
            <Link to={"/app/dashboard"}>Login</Link>
        </div>
    );
}

export default Home