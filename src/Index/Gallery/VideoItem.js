
import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { Modal } from 'react-bootstrap';

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
    render() {
        return (
            <div className="img-card">
                <ReactPlayer className="videoFrame" url={this.props.url} key={this.props.key} playing={this.state.isPlay} />
                <div className="card__text">
                    <p className="card__title"><button onClick={this.playVideo} type="button" className="btn btn-outline-secondary"><i style={{ color: 'white', fontSize: '16px' }} className={"fas" + (this.state.isPlay ? ' fa-pause' : ' fa-play')} />
                    </button>
                    </p>
                    <p className="card__title"><button onClick={this.handleShow} type="button" className="btn btn-outline-secondary"><i className={"fas fa-eye"} />
                    </button>
                    </p>
                </div>
                <Modal
                    size="xl"
                    scrollable={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isOpenModal}
                    onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image previewer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <ReactPlayer className="videoFrame" url={this.props.url} key={this.props.key} controls={true} playing />
                        </p>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={() => { downloadVideoFromLink(this.props.itemSrc) }}>
                            Download this video
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </div>
        );
    }
}
export default VideoItem;
