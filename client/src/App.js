import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthenticationPage from "./pages/Authentication/Authentication";
import DashboardPage from './pages/Dashboard/Dashboard';
import loginType from './pages/Authentication/state/loginType';
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { ProvideAuth } from './hooks/useAuth';

function App() {

  return (
    <ProvideAuth>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/login">
            <AuthenticationPage type={loginType.LOGIN} />
          </Route>
          <Route path="/signup">
            <AuthenticationPage type={loginType.REGISTER} />
          </Route>
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </BrowserRouter>
      </MuiThemeProvider>
    </ProvideAuth>
  );
}

export default App;
