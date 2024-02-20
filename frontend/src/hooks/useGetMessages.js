import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const { seletedConversation, messages, setMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                // Get the token from local storage
                const token = localStorage.getItem('jwt');
                // Make sure the token exists
                if (!token) {
                    throw new Error('Unauthorized - Missing token');
                }
                const response = await fetch(`http://localhost:5000/api/message/${seletedConversation._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch conversation data');
                }
                const data = await response.json();
                // console.log('Fetched messages:', data); // Log the fetched data
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (seletedConversation?._id) getMessages()
    }, [seletedConversation?._id, setMessages])

    return { loading, messages };


}

export default useGetMessages


// import { useEffect, useState } from 'react';
// import useConversation from '../zustand/useConversation';
// import toast from 'react-hot-toast';

// function useGetMessages() {
//     const [loading, setLoading] = useState(false);
//     const { seletedConversation, messages, setMessages } = useConversation();

//     useEffect(() => {
//         const getMessages = async () => {
//             setLoading(true);
//             try {
//                 // Check if seletedConversation exists and has an _id property
//                 if (!seletedConversation || !seletedConversation._id) return;

//                 // Get the token from local storage
//                 const token = localStorage.getItem('jwt');
//                 // Make sure the token exists
//                 if (!token) {
//                     throw new Error('Unauthorized - Missing token');
//                 }
//                 const response = await fetch(`http://localhost:5000/api/message/${seletedConversation._id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch conversation data');
//                 }
//                 const data = await response.json();
//                 setMessages(data);
//             } catch (error) {
//                 toast.error(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getMessages();
//     }, [seletedConversation?._id, setMessages]);

//     return { loading, messages };
// }

// export default useGetMessages;
