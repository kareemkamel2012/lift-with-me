import React from "react";
import { UserContext } from "../context/userContext";

const NavBar = () => {
    const { user } = React.useContext(UserContext);

    return user ? <LoggedInNavBar /> : <LoggedOutNavBar />;
}

const LoggedInNavBar = () => {
    const { user } = React.useContext(UserContext);

    return (
        <nav className=
        "bg-gray-800 p-4 container mx-auto flex justify-between items-center w-full"
        >
            <h3>{user?.firstName}</h3>
            <h3>{user?.lastName}</h3>
            <h3>{user?.email}</h3>
        </nav>
    )
}

const LoggedOutNavBar = () => {
    return (
        <nav className="bg-gray-800 p-4 container mx-auto w-full flex justify-between items-center">
            <h3 className="text-white font-bold">Lift With Me!</h3>
            <div className="flex space-x-4">
                <a className="bg-blue-600 p-2 rounded text-white" href="/login">Log In</a>
                <a className="bg-blue-600 p-2 rounded text-white" href="/signup">Sign Up</a>
            </div>
        </nav>
    );
}
export default NavBar;