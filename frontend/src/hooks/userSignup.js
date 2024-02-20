import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function userSignup() {

    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const signup = async ({ username, password, confirmpassword, gender, fullname }) => {

        const success = handleInputError({ username, password, confirmpassword, gender, fullname });
        if (!success) return false;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    confirmpassword,
                    gender,
                    fullname
                })
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }
            // Store token in local storage
            localStorage.setItem('jwt', data.token);
            
            localStorage.setItem('chat-user', JSON.stringify(data.newUser))
            setAuthUser(data.newUser)
            toast.success('SignUp Successfully!');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading }



};

export default userSignup



function handleInputError({ username, password, confirmpassword, gender, fullname }) {
    if (!username || !password || !gender || !fullname || !confirmpassword) {
        toast.error('Please fill all this filled')
        return false;
    }

    if (password !== confirmpassword) {
        toast.error('Passwords do not match')
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false;
    }

    return true;
}
