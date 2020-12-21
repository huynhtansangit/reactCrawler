import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../../Gallery/VideoItem'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import './video.css';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player'


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
});
function Example(props) {
    let classes = useStyles();
    const [isShowModalVideo, setShowModalVideo] = React.useState(false);
    const [videoItemSrc, setVideoItemSrc] = React.useState("");

    const handleShowModalVideo = (url)=>{
        // Set video url whenever modal is showed, not when it closed.
        if(!isShowModalVideo)
            setVideoItemSrc(url);
        setShowModalVideo(!isShowModalVideo);
    }

    return (
        <div className={classes.root}>
            <ImageList cols={4} className={classes.root} gap={2}>
                {
                    props.data.map((item, i) =>
                        <ImageListItem key={i}>
                            <VideoItem handleModal = {(url)=>{
                                    handleShowModalVideo(url);
                                }} url={item.url}></VideoItem>
                        </ImageListItem>
                    )
                }
            </ImageList>
            <Modal
                size="xl"
                scrollable={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isShowModalVideo}
                onHide={()=> handleShowModalVideo(videoItemSrc)}>
                <Modal.Header closeButton>
                    <Modal.Title>Video previewer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ReactPlayer className="videoFrame" url={videoItemSrc} controls={true} playing /> :
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={()=>this.clickAddToCollection(videoItemSrc, "video")}>
                        Remove from my collection
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}

export default Example;
