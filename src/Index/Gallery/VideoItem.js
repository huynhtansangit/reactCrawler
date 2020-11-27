
import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class VideoItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            isPlay:false,
        }
    }
    playVideo =()=>{
        this.setState({
            isPlay:!this.state.isPlay
        })
    }
    render() {
        return (
            <div className="img-card">
                <ReactPlayer className="videoFrame" url={this.props.url} key={this.props.key} playing={this.state.isPlay} />
                <div className="card__text">
                    <p className="card__title"><button onClick={this.playVideo} type="button" className="btn btn-outline-secondary"><i style={{ color: 'white', fontSize: '14px' }} className={"fas"+ (this.state.isPlay ? ' fa-pause':' fa-play') }/>
                    </button>
                    </p>
                </div>
            </div>
        );
    }
}
export default VideoItem;
