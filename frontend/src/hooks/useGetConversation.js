
import  { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function useGetConversation() {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                // Get the token from local storage
                const token = localStorage.getItem('jwt');
                // Make sure the token exists
                if (!token) {
                    throw new Error('Unauthorized - Missing token');
                }
                const response = await fetch("http://localhost:5000/api/users", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch conversation data');
                }
                const data = await response.json();
                setConversation(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { conversation, loading };
}

export default useGetConversation;

