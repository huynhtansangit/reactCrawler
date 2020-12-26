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

export default function GroupedSelect({ isType, ...rest }) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(isType);

  }, [isType]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const renderTypeSelect = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">
          <FilterListIcon />
        Type</InputLabel>
        <Select
          onChange={handleChange}
          defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Type</ListSubheader>
          <MenuItem value={1} primaryText="login">Login</MenuItem>
          <MenuItem value={2}>Register</MenuItem>
          <MenuItem value={3}>Register success</MenuItem>
          <MenuItem value={4}>Reset password</MenuItem>
          <MenuItem value={5}>Reset password success</MenuItem>
          <MenuItem value={6}>Create collection</MenuItem>
          <MenuItem value={7}>Remove collection</MenuItem>
          <MenuItem value={8}>Add item</MenuItem>
          <MenuItem value={9}>Remove item</MenuItem>
          <MenuItem value={10}>Crawl</MenuItem>
          <MenuItem value={11}>Add item</MenuItem>
          <MenuItem value={12}>Admin login</MenuItem>
          <MenuItem value={13}>Admin reset password</MenuItem>
          <MenuItem value={14}>Admin reset password success</MenuItem>
          <MenuItem value={15}>De-activate account</MenuItem>
          <MenuItem value={16}>Activate account</MenuItem>
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
      <Select defaultValue="" id="grouped-select">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <ListSubheader>Platform</ListSubheader>
        <MenuItem value={1}>Instagram</MenuItem>
        <MenuItem value={2}>Facebook</MenuItem>
        <MenuItem value={3}>Tiktok</MenuItem>
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