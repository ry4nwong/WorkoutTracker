import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(document.cookie === '') {
            navigate('/login');
        }
    });


    return <h1>Welcome to the Home Page!</h1>;
};

export default HomePage;