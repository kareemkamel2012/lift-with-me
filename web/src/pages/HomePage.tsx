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
        <>
            <NavBar />
            <Feed />
        </>
    )
}

export default HomePage;