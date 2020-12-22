import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ImageStorage from './ImageTab/ImageStorage';
import VideoStorage from './VideoTab/VideoStorage';
// import ProfileRemake from './Profile/ProfileRemake';

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
      { (
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


export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [imagesData, setImagesData] = React.useState([]);
  const [videosData, setVideosData] = React.useState([]);

  let imgData=[], vidData=[];
  // const [infoUser, setInfoUser] = React.useState({loading: true, error: ""})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(()=>{
    // console.log(props);
    // props.dataOfCollection.forEach(element => {
      for(const element of props.dataOfCollection){
      if(element["type"]==="picture")
      {
        imgData.push(element);
      }
      else {
        vidData.push(element);
      }
    };
    setImagesData(imgData);
    setVideosData(vidData);
    // console.log(imagesData);
  }, [props.dataOfCollection]);



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
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ImageStorage data={imagesData}/>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <VideoStorage  data={videosData}/>
      </TabPanel>
    </div>
  );
}
