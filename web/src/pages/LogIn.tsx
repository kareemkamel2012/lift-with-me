import { SERVER_URL } from "../utils/globals";
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    interface loginData {
        email: string;
        password: string;
    }

    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: loginData = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value
        }

        fetch(`${SERVER_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                console.log('login success');
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                throw new Error('login failed');
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">  
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>  
        <form onSubmit={handleFormSubmit}>  
            <div className="mb-4">  
                <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-1">
                    Email
                </label>  
                <input
                type="email"
                id="email"
                required
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="you@example.com" 
                />  
            </div>  
            <div className="mb-6">  
                <label
                htmlFor="password" 
                className="block text-gray-700 text-sm font-semibold mb-1">
                    Password
                    </label>  
                <input
                type="password"
                id="password" 
                required 
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300" 
                placeholder="********" 
                />  
            </div>  
            <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Login
            </button>  
        </form>  
        <div className="mt-4 text-center">  
            <a href="#" className="text-blue-500 hover:underline">
                Forgot your password?
            </a>  
        </div>  
        <div className="mt-2 text-center">  
            <p className="text-gray-600 text-sm">
                Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
            </p>  
        </div>  
    </div>  
    )
}

export default LogIn;
