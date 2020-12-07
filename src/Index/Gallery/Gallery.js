import React, { Component } from 'react';
import ImageItem from './ImageItem';
import OwnerMedia from './OwnerMedia';
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import VideoItem from './VideoItem';

const DOWNLOAD_ENDPOINT = "https://dacnhk1.herokuapp.com/download/";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImg: true,
            isVideo: false,
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps = (props)=> {
        if(props.nameNetwork !== 'instagram'){
            this.activeVideo();
        }
    }

    activePhoto = () => {
        this.setState({ isImg: true })
        this.setState({ isVideo: false })
    }
    activeVideo = () => {
        this.setState({ isVideo: true })
        this.setState({ isImg: false })
    }
    render() {
        // Helper functions
        const renderImageGallery = () => {
            let res;
            if (Object.keys(this.props.dataGallery).length === 0) {
                // Check if data is null => Show loading
                res = <img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif" alt="loading" />
            }
            else {
                if (!this.props.dataGallery.error) {
                    // If not error => Show images
                    res = this.props.dataGallery.imagesData.map((img, idx) =>
                        <ImageItem itemSrc={img.url} key={idx} />)
                }
                else {
                    // else: error occurred => Show pic 500
                    res = (<img className="justify-item-center"
                        src="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg" alt="500 error" />);
                }
            }
            return (res);
        }
        // FIXME CẦN XỬ LÝ KHI MÀ DATA VỀ NULL THÌ KHÔNG SẬP LUÔN FE.
        const handleCountPost = () =>{
            if(this.props.dataGallery.ownerMedia.countPost)
                return this.props.dataGallery.ownerMedia.countPost;
            else if(this.props.dataGallery.ownerMedia.count_video)
                return this.props.dataGallery.ownerMedia.count_video;
            else    
                return 1;
        }
        const renderOwnerMedia = () => {
            if (Object.keys(this.props.dataGallery).length === 0) {
                return (<OwnerMedia avatar="https://img.idesign.vn/2018/10/23/id-loading-1.gif" username="Loading"
                    fullname="Loading" countPost="Loading" countFollowedBy="Loading" />)
            }
            else {
                return (!this.props.dataGallery.error ?
                    (
                        <OwnerMedia avatar={this.props.dataGallery.ownerMedia.avatar}
                            username={this.props.dataGallery.ownerMedia.username}
                            fullname={this.props.dataGallery.ownerMedia.fullname}
                            countPost={ handleCountPost() }
                            countFollowedBy={this.props.dataGallery.ownerMedia.countFollowedBy} 
                            nameNetwork={this.props.nameNetwork}/>) : (
                        <OwnerMedia
                            avatar="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg"
                            username="Error" fullname="Error" countPost="Error" countFollowedBy="Error" 
                            nameNetwork={this.props.nameNetwork}/>
                    ))
            }
        }
        const renderVideoGallery = () => {
            if (Object.keys(this.props.dataGallery).length === 0) {
                // Check if data is null => Show loading
                return (<img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif" alt="loading" />)
            }
            else {
                // Else: loaded
                if (!this.props.dataGallery.error) {
                    // If not error => Show images
                    if(this.props.nameNetwork === 'tiktok'){
                        return(<VideoItem url={`${DOWNLOAD_ENDPOINT}${this.props.nameNetwork}?url=${this.props.inputUrl}`}></VideoItem>)
                    }
                    else{
                        if(this.props.dataGallery.videosData)
                        return (
                            (this.props.dataGallery.videosData.map((video, idx) =>
                                <VideoItem url={video.url} key={idx}></VideoItem>
                            )))
                    }
                }
                else {
                    // else: error occurred => Show pic 500
                    return ((<img className="justify-item-center"
                        src="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg" alt="server error" />))
                }
            }
        }
        const renderLoadMoreButton = () => {
            // Load more only available with instagram
            if(this.props.nameNetwork !== 'tiktok'){
                if (Object.keys(this.props.dataGallery).length === 0 ||
                    !this.props.dataGallery.videosData || !this.props.dataGallery.imagesData) {
                    return ('');
                }
                else {
                    if (this.props.disableLoadMoreBtn) {
                        // 
                        return (
                            <div className="row w-100 mt-3">
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <button
                                        style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                        type="button" className="btn btn-danger justify-content-center" disabled>Load more media </button>
                                </div>
                            </div>)
                    }
                    else {
                        return (
                            <div className="row w-100 mt-3">
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                    <button
                                        style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                        type="button" className="btn btn-danger justify-content-center" onClick={this.props.getMoreMedia}>Load more media </button>
                                </div>
                            </div>)
                    }
                }
            }
            else{
                return("")
            }
        }


        return (
            <section id="gallery-section">
                <div className="gallery-container text-center">
                    <div className="d-inline-block">
                        <div className="wonderful-gift-title text-left"
                            style={{ fontFamily: 'Pristina', fontSize: '48px', letterSpacing: '4px' }}>Your Gallery</div>
                        <h2 className="text-left slogan-title text-uppercase" style={{ letterSpacing: '4px' }}>Let's enjoy yourself</h2>
                    </div>
                    <div className="row">
                        <div id="btn-image-gallery" className={"btn photo-btn col-sm" + (this.state.isImg ? ' active' : ' ')} onClick={this.activePhoto}>
                            <span>IMAGE TAB</span>
                        </div>
                        <div id="btn-video-gallery" className={"btn video-btn col-sm" + (this.state.isVideo ? ' active' : ' ')} onClick={this.activeVideo}>
                            <span>VIDEO TAB</span>
                        </div>
                    </div>

                    <div id="image-tab-gallery" className="row gallery-tab" style={{display: this.state.isImg ? "" : "none"}}>
                        <div className="col-lg-8 col-md-8 col-sm-12 image-video-container justify-content-center">
                            {renderImageGallery()}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {renderOwnerMedia()}
                            <button
                                style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                type="button" className="btn btn-danger">sign in to download</button>
                        </div>
                        {renderLoadMoreButton()}
                    </div>
                    
                    <div id="video-tab-gallery" className="row gallery-tab " style={{display: this.state.isVideo ? "" : "none"}}>
                        <div className="col-lg-8 col-md-8 col-sm-12 image-video-container justify-content-center">
                            {renderVideoGallery()}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {renderOwnerMedia()}
                            <button
                                style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                type="button" className="btn btn-danger">sign in to download</button>
                        </div>
                        {renderLoadMoreButton()}
                    </div>
                </div>
            </section>
        );
    }
}
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default Gallery;