import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import { Icons } from '../icon-library';
import Loader from '../components/loader';

// Services
import { signOut } from '../services/auth-service';
import { getUser } from '../services/user-service';

/**
 * This page displays a user's contact information and allows them
 * to modify it by navigating to 360. It allows them to monitor
 * their progress through legal agreements and logout of the app
 */
class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    // We need the component's state so we can trigger a page refresh
    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayPhone: false,
      displayEmail: true,
      privacyComplete: true,
      waiverComplete: true,
      termsComplete: true,
      user: null,
      firstName: null,
      lastName: null,
      phoneNum: null,
      email: null,
      loading: false,
    }
    // The click handlers needs "this"
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
    this.loadUserData();
  }

  // Authenticate the user and trigger a page change
  handleClickLogout() {
    signOut();
    // Pass the message up to the main page
    this.props.onLogout();
  }

  // Redirect to 360 to edit user info
  handleClickEdit() {
    window.open("https://360.gordon.edu/#/profile/" + this.state.username, '_blank');
  }

  // Bind dialog data to the state
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  // Format the phone number as (###) ###-####
  formatPhone = phone => {
    return "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6, 10);
  };

  // If the user is logged in, then display the settings
  // But if the logout button is clicked, redirect to the login page
  render() {
    let content;
    if (this.state.loading) {
      content = (<Loader />);
    }
    else {
      content = (
        <div>
          <Grid container>
            <Grid item xs={8}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item>
                  <h3>
                    Contact Information
                    </h3>
                </Grid>
              </Grid>
            </Grid>

            {/* Button for editing contact information */}
            <Grid item xs={4}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleClickEdit}>
                    {Icons.editIcon}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div style={{ padding: '.75em', }}>
            Name: {this.state.firstName} {this.state.lastName}
          </div>
          <div style={{ padding: '.75em', }}>
            Phone: {this.state.phoneNum}
          </div>
          <div style={{ padding: '.75em', }}>
            Email: {this.state.email}
          </div>

          {/* Shows which legal agreements have been completed */}
          <h3>
            Legal Agreements
          </h3>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={this.state.waiverComplete}
                  value="waiverComplete"
                />
              }
              label="Liability Waiver"
            />
          </FormGroup>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={this.state.privacyComplete}
                  value="privacyComplete"
                />
              }
              label="Privacy Policy"
            />
          </FormGroup>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={this.state.termsComplete}
                  value="termsComplete"
                />
              }
              label="Terms of Use"
            />
          </FormGroup>

          <div style={{ padding: '.75em', }}>
          </div>

          {/* Button to logout
           the link keeps the url from remaining at the "settings" page after logout */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="raised"
              color="secondary"
              style={{ width: '100%', }}
              onClick={this.handleClickLogout}
            >
              Logout
            </Button>
          </Link>
        </div>
      );
    }

    return (<div>{content}</div>);
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    this.setState({ loading: true });
    try {
      let data = await getUser();
      this.setState({
        user: data,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNum: this.formatPhone(data.phoneNum),
        email: data.email,
        username: data.username,
        loading: false,
      });
    }
    catch (err) {
      throw err;
    }
  };

}

SettingsPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
  matchTab: PropTypes.func.isRequired,
};

export default SettingsPage;