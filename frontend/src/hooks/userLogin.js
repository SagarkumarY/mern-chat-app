import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function userLogin() {
    const [loading, setLoading] = useState(false);

    const { authuser, setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        const success = handleInputError(username, password);
        if (!success) return false;
        setLoading(true)
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            // console.log(data)
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data.user));
            localStorage.setItem('jwt', data.token);
            setAuthUser(data.user);
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };


    return { login, setLoading }



};
export default userLogin



function handleInputError(username, password) {
    if (!username || !password) {
        toast.error('Please fill all this filled')
        return false;
    }


    return true;
}
