import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    const logOut = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }
            localStorage.removeItem('chat-user');
            localStorage.removeItem('jwt');
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { logOut, loading };
};

export default useLogout