import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './CustomizedMenu.css';
import Icon from '@material-ui/core/Icon';
// import auth from "../../auth/auth";
import {Link} from 'react-router-dom'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null} y
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleLogout = () => {
  //   auth.logout(()=>{props.history.push("/login")});
  // }

  return (
    <div>
      <Button
        id="dropdownMenuButton"
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        Account
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem>
          <ListItemIcon>
            <ExitToAppOutlinedIcon/>
          </ListItemIcon>
          <Link to="/login"><ListItemText primary={`Sign-in`} /></Link>
        </StyledMenuItem>
        <StyledMenuItem >
          <ListItemIcon>
            <Icon className="fas fa-user-plus" />
          </ListItemIcon>
          <Link to="/login"> <ListItemText primary="Sign-up" /></Link>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
