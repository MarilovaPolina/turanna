import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(data);
            } catch (error) {
                console.error('Ошибка:', error.response?.data || error.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Добро пожаловать, {user?.name}!</h1>
            <p>Email: {user?.email}</p>
            <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }}>Выйти</button>
        </div>
    );
}

export default Dashboard;