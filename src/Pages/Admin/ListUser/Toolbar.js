import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button
} from 'ver-4-11';
import {makeStyles} from '@material-ui/core'
import { Search as SearchIcon } from 'react-feather';


const useStyles = makeStyles((theme) => ({
  root: {},
  searchButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontSize: 12,
  },
}));

const Toolbar = ({ className, onChangeSearchValue, onAdvanceSearch, ...rest }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  useEffect(()=>{
    onChangeSearchValue(searchValue)
  },[searchValue]); //eslint-disable-line

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex"
                justifyContent="flex-start">
              <TextField
                fullWidth
                id="searchUserBar"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search user in this page by name or phone number"
                variant="outlined"
                onChange={(e)=>{setSearchValue(e.target.value);}}
              />
            <Button 
              id="btn-advance-search"
              className={classes.searchButton} 
              color="primary"
              variant="contained" 
              onClick={(e)=>{onAdvanceSearch(searchValue)}}
              style={{fontSize: '10px'}} size="small"
              labelStyle={{ fontSize: 10 }}>
                Advance Searching
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
