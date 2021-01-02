import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import React, { useEffect, useState } from 'react';
import { withStyles } from "@material-ui/core/styles";//eslint-disable-line
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import TabMenu from '../TabMenu';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ProfileContent from '../ProfileTab/ProfileContent';
import axios from 'axios';
import cookies from '../../../utils/cookie';
import { COLLECTIONS_URL } from '../../../utils/config.url';
import Skeleton from '@material-ui/lab/Skeleton';
import { deleteCollection } from '../../../services/user.services'
import { makeStyles } from '@material-ui/core/styles';

//eslint-disable-next-line
const useStyles =  makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function Item(props)  {
    const classes = useStyles();
    
    const [willLoadContent, setWillLoadContent] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [statusGetDataOfCollection, setStatusGetDataOfCollection]= useState({ loading: true, error: "false" });
    const [isOpen, setIsOpen]= useState(false);
    const [dataOfCollection, setDataOfCollection]= useState([]);
    const [selectedIndex, setSelectedIndex]= useState(0); //eslint-disable-line
    const [isShowItem, setIsShowItem]= useState(true);

    useEffect(()=>{
        (async () => {
            if (willLoadContent && firstRender && props.MainPrimary !== "Profile") {
                setWillLoadContent(false);

                const accessToken = cookies.get("accessToken");

                const config = {
                    url: `${COLLECTIONS_URL}/${props.id}`,
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
                            setStatusGetDataOfCollection({ loading: false, error: "" });
                            setDataOfCollection(data["items"]);
                        }
                    })
                    .catch(error => {
                        console.log("Error occurred when trying to get your collection.");
                        if (error.response) {
                            setStatusGetDataOfCollection({ loading: false, error: error.response.data['message'] });
                            alert(error.response.data.message);
                        }
                        else {
                            alert("Something went wrong. Please check your internet connection.");
                        }
                    })
                await setFirstRender(false);
            }
        })()
    })

    const onClickItem = (event, index) => {
        setIsOpen(!isOpen);
        setSelectedIndex(index);
        setWillLoadContent(true);
    }

    const clickDeleteCollection = (idCollection) => {
        if (window.confirm("Are you sure want to delete this collection?")) {
            deleteCollection(idCollection);
            setIsShowItem(false);
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
                onClick={(event) => onClickItem(event, 1)}
            >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={props.MainPrimary} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                    <ListItem button className={classes.nested}
                        onClick={(e) => clickDeleteCollection(props.id)}>
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

    const renderProfile = (type, classes) => {
        if (type === "profile") {
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
                        <ListItemText primary={props.MainPrimary} />
                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItem className={classes.nested}>
                                <ProfileContent />
                            </ListItem>
                        </List>
                    </Collapse>
                </div>
            )
        }
        else{
            return (
                <div>
                    { isShowItem && renderCollapse(classes)}
                </div>
            )
        }
    }
    return (
        <div>
            {renderProfile(props.type, classes)}
        </div>
    );
}

