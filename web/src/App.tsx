import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import React, { useEffect } from 'react';
import { getUser } from './utils/authUtils';
import { User } from './types/user';
import { UserContext } from './context/userContext';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const App = () => {
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
        getUser().then((data: User | null) => setUser(data));
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;