import React from 'react';
import Grid from 'material-ui/Grid';
import CreateIcon from 'material-ui-icons/Create';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';

// Component for changing settings
class Settings extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
    displayPhone: false,
    displayEmail: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <h2>
                  Contact Information
                </h2>
              </Grid>
            </Grid>
          </Grid>

          {/* Button for editing contact information */}
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button fab color="secondary" aria-label="add">
                  <CreateIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ padding: '.75em', }}>
          Name: Nathan Gray
        </div>
        <div style={{ padding: '.75em', }}>
          Phone: 999-888-7777
        </div>
        <div style={{ padding: '.75em', }}>
          Email: nathan.gray@gordon.edu
        </div>

        {/* Decide which contact information will be shared with riders */}
        <h2>
          Contact Information to Share
        </h2>

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.displayPhone}
                onChange={this.handleChange('displayPhone')}
                value="displayPhone"
                color="secondary"
              />
            }
            label="Phone Number"
          />
        </FormGroup>

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.displayEmail}
                onChange={this.handleChange('displayEmail')}
                value="displayEmail"
              />
            }
            label="Email Address"
          />
        </FormGroup>

        {/* Legal Agreements */}
        <h2>
          Legal Agreements
        </h2>
        
        <List dense={this.state.dense}>

          <ListItem button>
            <ListItemText disableTypography primary="Liability Waiver" />
          </ListItem> 

          <ListItem button>
            <ListItemText disableTypography primary="Privacy Policy" />
          </ListItem>

          <ListItem button>
            <ListItemText disableTypography primary="Terms of Use" />
          </ListItem>

        </List>

        {/* Button to logout */}
        <Button raised color="secondary" style={{ width: '100%', }}>
          Logout
        </Button>
      </div>
    );
  }
}

export default Settings;