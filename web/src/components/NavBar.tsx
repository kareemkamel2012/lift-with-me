import React from "react";
import { UserContext } from "../context/userContext";

const NavBar = () => {
    const { user } = React.useContext(UserContext);

    return user ? <LoggedInNavBar /> : <LoggedOutNavBar />;
}

const LoggedInNavBar = () => {
    const { user } = React.useContext(UserContext);

    return (
        <h3>{user!.username}</h3>
    )
}

const LoggedOutNavBar = () => {
    return (
        <>
            <h3>Log In!</h3>
            <h3>Sign Up!</h3>
        </>
    );
}
export default NavBar;