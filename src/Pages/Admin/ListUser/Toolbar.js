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
} from 'ver-4-11';
import {makeStyles} from '@material-ui/core'
import { Search as SearchIcon } from 'react-feather';
import { Button } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
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
            <Box maxWidth={500} >
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
            </Box>
            <Button variant="primary" onClick={(e)=>{onAdvanceSearch(searchValue)}}>Advance Searching</Button>
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
