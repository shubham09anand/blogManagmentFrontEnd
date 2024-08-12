import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getData = () => {
        axios.post("http://localhost:4000/getAllMovie")
            .then(response => {
                setData(response.data);
                console.log('Data retrieved:', response.data);
            })
            .catch(error => {
                setError(error.response || error.message);
                console.error('Error fetching data:', error.response || error.message);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {error && <div style={{ color: 'red' }}>Error: {error.message || 'Something went wrong'}</div>}
            <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
        </div>
    );
};

export default Home;
