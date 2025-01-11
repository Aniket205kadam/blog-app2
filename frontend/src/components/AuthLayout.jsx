import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({children, authentication=true}) {
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoading(false);
    }, [authStatus, authentication, navigate]);

    return loading ? <h1>Loading...</h1> : children;
}

export default Protected;