import React from "react";
import { UserContext } from "../context/userContext";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import Workouts from "../components/Workouts";

const HomePage = () => {
    const { user } = React.useContext(UserContext);

    return user ? <LoggedInHomePage /> : <LoggedOutHomePage />;
}

const LoggedInHomePage = () => {
    return (
        <>
            <NavBar />
            <Feed />
            <Workouts />
        </>
    )
}

const LoggedOutHomePage = () => {
    return (
        <div className="bg-gray-300 h-screen flex flex-col items-center">
            <NavBar />
            <Feed />
        </div>
    )
}

export default HomePage;