import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../Gallery/VideoItem'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import './video.css';
const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
});
function Example(props) {
    let classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList cols={4} className={classes.root} gap={2}>
                {
                    props.data.map((item, i) =>
                        <ImageListItem key={i}>
                            <VideoItem url={item.url}></VideoItem>
                        </ImageListItem>
                    )
                }
            </ImageList>
        </div>
    )
}

export default Example;
