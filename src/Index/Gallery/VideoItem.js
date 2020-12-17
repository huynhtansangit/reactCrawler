
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
// import { Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import addToCollection from '../../services/user.services'


// FIXME New format data returned is not adapted with this model by now
class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: false,
            isOpenModal: false,
        }
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
        addToCollection(this.props.url, "", "video", ()=>{
            // If not login -> redirect to login.
            this.props.history.push("/login", {
                from: tempThis.props.location,
                action: "addToCollection",
                imgSrc: tempThis.props.url,
                thumbnail: "",
                type:"video"
            });
        })
    }

    render() {
        return (
            <div className="img-card">
                <ReactPlayer className="videoFrame" url={this.props.url} playing={this.state.isPlay} />
                <div className="card__text">
                    <p className="card__title"><button onClick={this.playVideo} type="button" className="btn btn-outline-secondary">
                    {this.renderPlayOrPause()}
                    </button>
                    </p>
                    <p className="card__title">
                        <button onClick={ ()=>{
                        // this.handleShow()
                        
                        // Click here will trigger show modal in Gallery.
                        this.props.handleModal(this.props.url)
                    }} type="button" className="btn btn-outline-secondary">
                            <VisibilityOutlinedIcon />
                        </button>
                    </p>
                    <p className="card__title">
                        <button onClick={this.clickAddToCollection} type="button" className="btn btn-outline-secondary">
                            <FavoriteTwoToneIcon />
                        </button>
                    </p>
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
