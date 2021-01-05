import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoItem from '../../Gallery/VideoItem'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import './video.css';
import { Button, Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import { removeItemFromCollection } from '../../../services/user.services'


const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
});
function VideoStorage(props) {
    let classes = useStyles();
    const [isShowModalVideo, setShowModalVideo] = React.useState(false);
    const [videoItemSrc, setVideoItemSrc] = React.useState("");
    const [mediaDTO, setMediaDTO] = React.useState("");
    // const []

    const handleShowModalVideo = (url, dto) => {
        if (!isShowModalVideo){
                setVideoItemSrc(url);   
                setMediaDTO(dto); 
            }
        setShowModalVideo(!isShowModalVideo);
    }

    const clickUnFavorite = async (collectionId, itemId) => {
        if(window.confirm("Are you sure want to remove this item from collection?")){
            await removeItemFromCollection(collectionId, itemId);
            await setShowModalVideo(false);
        }
    }

    return (
        <div className={classes.root}>
            <ImageList cols={4} className={classes.root} gap={2}>
                {
                    props.data.map((item, i) =>
                        <ImageListItem key={i}>
                            <VideoItem handleModal={(url, dto) => {
                                handleShowModalVideo(url, dto);
                            }} 
                            isClickAddToCollection={(itemDTO)=>{
                                clickUnFavorite(itemDTO.collectionId, itemDTO.id);
                            }}
                            url={item.url} collectionId={item.collection_id}
                            id={item.id} isAdded={true}
                            isInHistoryPage={props.isInHistoryPage}
                            showFavoriteBtn={props.showFavoriteBtn}></VideoItem>
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
                onHide={()=> handleShowModalVideo()}>
                <Modal.Header closeButton>
                    <Modal.Title>Video previewer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ReactPlayer className="videoFrame" url={videoItemSrc} controls={true} playing /> :
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>clickUnFavorite(mediaDTO.collectionId, mediaDTO.id)}>
                        Remove from my collection
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default VideoStorage;
