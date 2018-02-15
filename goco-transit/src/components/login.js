import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Gordon360Home from '../images/gordon_360_home.png';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router'

// Services
import { authenticate, isAuthenticated } from '../services/auth-service';

// Login page component
class Login extends React.Component {
  constructor() {
    super();
    // We need the component's state so we can trigger a page refresh
    this.state = {
      userName: null,
      password: null,
      loginFailed: false,
      triggerReRender: false,
    }
    // The click handler needs "this"
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  // Authenticate the user and trigger a page change
  async handleClickLogin(event) {
    event.preventDefault();
    try {
      await authenticate(this.state.userName, this.state.password);
      this.setState({ triggerReRender: true });
    } catch (err) {
      this.setState({ loginFailed: true });
    }
  }

  // Set state variables
  handleFormChange(input) {
    return event => {
      this.setState({ [input]: event.target.value });
      this.setState({ loginFailed: false });
    };
  }

  // Depending on the user's authentication status, either the login component
  // will be displayed or the user will be redirected to the first tab
  render() {
    if (!isAuthenticated()) {
      return (
        <div>
          {/* Header bar with app title */}
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                GoCo Transit
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Login information is displayed on a card */}
          <div style={{ margin: "1.5em" }}>
            <Card>

              {/* An image of Gordon 360 to nofity the user to use
            their 360 credentials */}
              <CardMedia
                style={{ width: "100%", height: "12em" }}
                image={Gordon360Home}
              />

              {/* Error message if login fails */}
              {this.state.loginFailed &&
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ paddingTop: "1em", paddingLeft: "1em", color: "#ff3300" }}
                >
                  Login Failed
                </Typography>
              }

              {/* Username */}
              <CardContent>
                <TextField
                  id="userName"
                  label="Username"
                  placeholder="firstname.lastname"
                  variant="username"
                  margin="none"
                  value={this.state.userName}
                  onChange={this.handleFormChange('userName')}
                  style={{ width: "100%" }}
                />

                <div style={{ margin: "1em" }}>
                </div>

                {/* Password */}
                <TextField
                  id="password"
                  label="Password"
                  variant="password"
                  type="password"
                  margin="none"
                  value={this.state.password}
                  onChange={this.handleFormChange('password')}
                  style={{ width: "100%" }}
                />
              </CardContent>

              {/* Login button */}
              <CardActions>
                <Button color="secondary" onClick={this.handleClickLogin}>
                  Login
              </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      )
    }
    else {
      return (
        <Redirect to={"/"} />
      )
    }
  }
}

export default Login;