import { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
    let auth = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticate = async () => {
            const result = await auth.authenticate();
            // setIsAuthenticated(result);
            setLoading(false);
        };
        authenticate();
    }, []);

    return (
        <Route {...rest} render={(props) =>
            auth.user ? <Component {...props} />
                :
                loading ? <div></div>
                    :
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        } />
    );
}

export default PrivateRoute;