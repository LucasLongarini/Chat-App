import { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
    let auth = useAuth();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            const result = await auth.authenticate();
            setIsAuthenticated(result);
            setLoading(false);
        };
        authenticate();
    }, []);

    useEffect(() => {
        setIsAuthenticated(auth.user)
    }, [auth.user]);

    return (
        <Route {...rest} render={(props) =>
            isAuthenticated ? <Component {...props} />
                :
                loading ? <div></div>
                    :
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        } />
    );
}

export default PrivateRoute;