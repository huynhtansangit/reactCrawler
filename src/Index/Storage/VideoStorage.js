import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../Gallery/VideoItem'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 800,
        overflowY: 'scroll',
        marginTop: 20,
    },
});
function Example(props) {
    let classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList variant="masonry" cols={6} gap={10}>
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
