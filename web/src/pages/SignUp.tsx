import { SERVER_URL } from "../utils/globals";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    interface SignUpData {
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }

    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: SignUpData = {
            username: event.currentTarget.username.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value
        }

        fetch(`${SERVER_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                console.log('signup success');
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                throw new Error('signup failed');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="johndoe"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
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
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
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
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        required
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="John"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        required
                        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Doe"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    )
}

export default SignUp;