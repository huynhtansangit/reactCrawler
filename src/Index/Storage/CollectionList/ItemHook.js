import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import TabMenu from '../TabMenu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ProfileContent from '../ProfileTab/ProfileContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { deleteCollection } from '../../../services/user.services';
import PropTypes from 'prop-types';
import axios from 'axios';
import { COLLECTIONS_URL } from "../../../utils/config.url";
import cookies from "../../../utils/cookie";
// import { TranslateRounded } from '@material-ui/icons';
const useStyle = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function ItemHook({ MainPrimary, id, key, ...rest }) {
    const classes = useStyle();

    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [willLoadContent, setWillLoadContent] = React.useState(false);
    const [firstRender, setFirstRender] = React.useState(true);
    const [statusGetDataOfCollection, setStatusGetDataOfCollection] = React.useState({
        loading: true,
        error: "false",
    });
    const [dataOfCollection, setDataOfCollection] = React.useState([]);
    const [showItem, setShowItem] = React.useState(true);

    // Component Did Update convert
    useEffect(() => {
        // console.log("this is id: " + id);
        const fetchedApi = async ()=>{
            if (willLoadContent && firstRender && MainPrimary !== "Profile") {
                setWillLoadContent(false);
    
                const accessToken = cookies.get("accessToken");
    
                const config = {
                    url: `${COLLECTIONS_URL}/${id}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${accessToken}`
                    },
                };
    
                // get data for collection
                await axios.request(config)
                    .then(res => res.data)
                    .then(data => {
                        if (data) {
                            setStatusGetDataOfCollection({
                                loading: false, error: ""
                            });
                            setDataOfCollection(data["items"]);
                        }
                    })
                    .catch(error => {
                        console.log("Error occurred when trying to get your collection.");
                        if (error.response) {
                            setStatusGetDataOfCollection({
                                loading: false,
                                error: error.response.data['message'],
                            });
                            alert(error.response.data.message);
                        }
                        else {
                            alert("Something went wrong. Please check your internet connection.");
                        }
                    })
                await setFirstRender(false);
            }
        } 
        fetchedApi();
    });
    // ------ end convert -----

    const onClickItem = (event, index) => {
        setOpen(!open);
        setSelectedIndex(index);
        setWillLoadContent(true);
    }

    const clickDeleteCollection = (idCollection) => {
        if (window.confirm("Are you sure want to delete this collection?")) {
            deleteCollection(idCollection);
            setShowItem(false);
        }
    }

    const renderTabMenu = (classes) => {
        if (statusGetDataOfCollection['loading'] === true) {
            return (
                <>
                    <Skeleton animation="wave" width='100%' height={100} />
                </>
            )
        }
        else {
            return (
                <ListItem className={classes.nested}>
                    <TabMenu dataOfCollection={dataOfCollection} />
                </ListItem>
            )
        }
    }
    const renderCollapse = (classes) => (
        <>
            <ListItem
                button
                selected='true'
                onClick={(event) => onClickItem(event, selectedIndex)}
            >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={MainPrimary} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    <ListItem button className={classes.nested}
                        onClick={(e) => clickDeleteCollection(id)}>
                        <ListItemIcon>
                            <RemoveOutlinedIcon style={{ color: '#F91A2C', fontSize: 40 }} />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    {renderTabMenu(classes)}
                </List>
            </Collapse>
        </>
    )
    const renderProfile = (classes) => {
        if (MainPrimary === "Profile") {
            return (
                <div>
                    <ListItem
                        button
                        selected='true'
                        onClick={(event) => onClickItem(event, 1)}
                    >
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={MainPrimary} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItem className={classes.nested}>
                                <ProfileContent />
                            </ListItem>
                        </List>
                    </Collapse>
                </div>
            )
        }

        else
            return (
                <div>
                    {showItem && renderCollapse(classes)}
                </div>
            )
    }
    return (
        <div>
            {renderProfile(classes)}
        </div>
    );
}
ItemHook.propTypes = {
    id: PropTypes.string.isRequired,
};