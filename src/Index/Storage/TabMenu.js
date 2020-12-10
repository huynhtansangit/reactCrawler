import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ImageStorage from './ImageStorage';
import ProfileContent from './ProfileContent';
import VideoStorage from './VideoStorage';
import {GET_MY_COLLECTION_URL, MY_ACCOUNT_INFO_URL} from '../../utils/config.url';
import axios from 'axios';
import cookies from '../../utils/cookie';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [statusGetCollection, setStatusGetCollection] = React.useState({loading: true, error: "false"})
  const [imagesData, setImagesData] = React.useState([]);
  const [videosData, setVideosData] = React.useState([]);
  const [infoUser, setInfoUser] = React.useState({loading: true, error: ""})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    const accessToken = cookies.get("accessToken");

    let config = {
      url: GET_MY_COLLECTION_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessToken}`
      },
    };

    // get data for collection
    axios.request(config)
      .then(res => res.data)
      .then(data=>{
        if(data){
          let imagesData = [];
          let videosData = [];

          data['favorites'].forEach(el => {
            if(el['type']==="picture")
              imagesData.push(el);
            else
              videosData.push(el);
          });

          setStatusGetCollection({
            loading: false,
            error: ""
          })

          setImagesData(imagesData);
          setVideosData(videosData);
        }
      })
      .catch(error => {
        console.log("Error occurred when trying to get your collection.");
        if (error.response) {
          setStatusGetCollection({
            loading:false,
            error: error.response.data
          })
          // alert(error.response.data);
        }
        else {
            alert("Something went wrong. Please check your internet connection.");
        }
      })
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          centered>
          <Tab label="Your Images" icon={<FavoriteIcon />} {...a11yProps(0)} />
          <Tab label="Your Videos" icon={<VideoLibraryOutlinedIcon />} {...a11yProps(1)} />
          <Tab label="Your Information" icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ImageStorage status={statusGetCollection} data={imagesData}/>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <VideoStorage status={statusGetCollection} data={videosData}/>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <ProfileContent data={infoUser}/>
      </TabPanel>
    </div>
  );
}
