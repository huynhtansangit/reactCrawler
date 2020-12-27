import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
}));

export default function GroupedSelect({ isType, onTypeChange, onPlatformChange, ...rest }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(isType);

  }, [isType]);

  // const handleChange = (event) => {
  //   const value=event.target.value;
  //   setValue(value);
    
  //   onTypeChange(value);
  // };
  const renderTypeSelect = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">
          <FilterListIcon />
        Type</InputLabel>
        <Select
          onChange={(event)=>{onTypeChange(event.target.value)}}
          defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Type</ListSubheader>
          <MenuItem value={'login'} primaryText="login">Login</MenuItem>
          <MenuItem value={'register'}>Register</MenuItem>
          <MenuItem value={'register_success'}>Register success</MenuItem>
          <MenuItem value={'reset_password'}>Reset password</MenuItem>
          <MenuItem value={'reset_password_success'}>Reset password success</MenuItem>
          <MenuItem value={'create_collection'}>Create collection</MenuItem>
          <MenuItem value={'remove_collection'}>Remove collection</MenuItem>
          <MenuItem value={'add_item'}>Add item</MenuItem>
          <MenuItem value={'remove_item'}>Remove item</MenuItem>
          <MenuItem value={'crawl'}>Crawl</MenuItem>
          <MenuItem value={'admin_login'}>Admin login</MenuItem>
          <MenuItem value={'admin_reset_password'}>Admin reset password</MenuItem>
          <MenuItem value={'admin_reset_password_success'}>Admin reset password success</MenuItem>
          <MenuItem value={'deactivate_account'}>De-activate account</MenuItem>
          <MenuItem value={'activate_account'}>Activate account</MenuItem>
          {/* <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem> */}
        </Select>
      </FormControl>
    )
  }
  const renderPlatformSelect = () => (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="grouped-select">
        <FilterListIcon />
        Platform</InputLabel>
      <Select defaultValue="" id="grouped-select"
        onChange={(event)=>{onPlatformChange(event.target.value)}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <ListSubheader>Platform</ListSubheader>
        <MenuItem value={'Instagram'}>Instagram</MenuItem>
        <MenuItem value={'Facebook'}>Facebook</MenuItem>
        <MenuItem value={'Tiktok'}>Tiktok</MenuItem>
        {/* <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem> */}
      </Select>
    </FormControl>
  )

  return (
    <div>
      {!isType ? renderPlatformSelect() : renderTypeSelect()}
    </div>
  );
}