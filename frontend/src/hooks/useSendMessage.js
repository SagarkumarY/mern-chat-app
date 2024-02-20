import { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { seletedConversation, messages, setMessages } = useConversation();
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            // Get the token from local storage
            const token = localStorage.getItem('jwt');
            // Make sure the token exists
            if (!token) {
                throw new Error('Unauthorized - Missing token');
            }
            const response = await fetch(`http://localhost:5000/api/message/send/${seletedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });


            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };

}

export default useSendMessage