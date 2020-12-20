
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
// import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import {addToCollection} from '../../services/user.services'


// FIXME New format data returned is not adapted with this model by now
class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,
            isOpenModal: false,
            itemDTO: {
                isAdding: !this.props.isAdded,
                imgSrc: this.props.url,
                thumbnail: "",
                type:"video",
                platform: this.props.platform, 
                id: this.props.id, 
                source: this.props.source
            }
        }
    }

    prepareData(){
        this.setState({itemDTO: {
            isAdding: !this.props.isAdded,
            imgSrc: this.props.url,
            thumbnail: "",
            type:"video",
            platform: this.props.platform, 
            id: this.props.id, 
            source: this.props.source
        }})
    }
    
    playVideo = () => {
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    handleShow = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal })
    }

    renderPlayOrPause = () => {
        if (this.state.isPlay)
        {
            return <PauseOutlinedIcon />
        }
        else return <PlayArrowOutlinedIcon />
    }

    clickAddToCollection = ()=>{
        const tempThis = this;
        addToCollection(this.props.url, "", "video", this.props.platform, this.props.id, this.props.source, ()=>{
            // If not login -> redirect to login.
            this.props.history.push("/login", {
                from: tempThis.props.location,
                action: "addToCollection",
                imgSrc: tempThis.props.url,
                thumbnail: "",
                type:"video",
                platform: this.props.platform, 
                id: this.props.id, 
                source: this.props.source
            });
        })
    }

    render() {
        return (
            <div className="img-card">
                <ReactPlayer className="videoFrame" url={this.props.url} playing={this.state.isPlay} />
                <div className="card__text">
                    <div className="card__title"><button onClick={this.playVideo} type="button" className="btn btn-outline-secondary">
                    {this.renderPlayOrPause()}
                    </button>
                    </div>
                    <div className="card__title">
                        <button onClick={ ()=>{
                                // Click here will trigger show modal in Gallery.
                                this.props.handleModal(this.props.url, {id: this.props.id, source: this.props.source, platform: this.props.platform, isAdding: !this.props.isAdded, collectionId: this.props.collectionId})
                            }} 
                            type="button" className="btn btn-outline-secondary">
                            <VisibilityOutlinedIcon />
                        </button>
                    </div>
                    <div className="card__title">
                        <button onClick={()=>{
                                this.prepareData();
                                this.props.isClickAddToCollection(this.state.itemDTO);
                            }} 
                            type="button" className={`btn btn-outline-secondary ${this.props.isAdded ? 'selectedBtn' : ""}`}>
                            <FavoriteTwoToneIcon />
                        </button>
                    </div>
                </div>
                {/* <Modal
                    size="xl"
                    scrollable={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isOpenModal}
                    onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image previewer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> */}
                        {/* Prevent user download video if not logged in. */}
                        {/* {
                            this.props.isAuth ? 
                            <ReactPlayer className="videoFrame" url={this.props.url} controls={true} playing /> :
                            <ReactPlayer className="videoFrame" url={this.props.url} controls={true} config={{ file: { attributes: { controlsList: 'nodownload' } } }} onContextMenu={e => e.preventDefault()} playing />
                        }
                    </Modal.Body> */}
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={() => { downloadVideoFromLink(this.props.itemSrc) }}>
                            Download this video
                        </Button>
                    </Modal.Footer> */}
                {/* </Modal> */}
            </div>
        );
    }
}
export default VideoItem;
