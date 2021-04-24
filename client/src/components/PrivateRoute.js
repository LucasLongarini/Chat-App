import { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authenticate = async () => {
            await auth.authenticate();
            setLoading(false);
        };
        authenticate();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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