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


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import VideoItem from './VideoItem';

const DOWNLOAD_ENDPOINT = "https://dacnhk1.herokuapp.com/download/";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImg: false,
            isVideo: false,
        }
    }

    componentDidMount() {
        console.log(this.props.dataGallery.videosData);
    }

    componentDidUpdate() {

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
        let renderImageGallery = () => {
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
        let renderOwnerMedia = () => {
            if (Object.keys(this.props.dataGallery).length === 0) {
                return (<OwnerMedia avatar="https://img.idesign.vn/2018/10/23/id-loading-1.gif" username="Loading"
                    fullname="Loading" countPost="Loading" countFollowedBy="Loading" />)
            }
            else {
                if (this.props.nameNetwork !== 'tiktok') {
                    return (!this.props.dataGallery.error ?
                        (
                            <OwnerMedia avatar={this.props.dataGallery.ownerMedia.avatar}
                                username={this.props.dataGallery.ownerMedia.username}
                                fullname={this.props.dataGallery.ownerMedia.fullname}
                                countPost={this.props.dataGallery.ownerMedia.countPost}
                                countFollowedBy={this.props.dataGallery.ownerMedia.countFollowedBy} />) : (
                            <OwnerMedia
                                avatar="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg"
                                username="Error" fullname="Error" countPost="Error" countFollowedBy="Error" />
                        ))
                }
                else {
                    // FIXME xảy ra trường hợp khi chọn tiktok sau đó chọn 2 cái còn lại sẽ lỗi, sẽ sửa khi mà có data của owner trả về với tiktok
                    return (<OwnerMedia
                        avatar="https://yinyangit.files.wordpress.com/2013/03/question-mark.png?w=346"
                        username="Not Provided" fullname="Not Provided" countPost="Not Provided" countFollowedBy="Not Provided" />)
                }

            }
        }
        let renderVideoGallery = () => {
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
                    else
                        return (
                            (this.props.dataGallery.videosData.map((video, idx) =>
                                <VideoItem url={video.url} key={idx}></VideoItem>
                            )))
                }
                else {
                    // else: error occurred => Show pic 500
                    return ((<img className="justify-item-center"
                        src="https://bizflyportal.mediacdn.vn/bizflyportal/461/347/2020/06/02/22/54/nhi15910916872906.jpg" alt="server error" />))
                }
            }
        }
        let renderLoadMoreButton = () => {
            // Load more only available with instagram
            if(this.props.nameNetwork === 'instagram'){
                if (Object.keys(this.props.dataGallery).length === 0) {
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
                    <div id="image-tab-gallery" className="row gallery-tab">
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
                    <div id="video-tab-gallery" className="row gallery-tab ">
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
                        {/* <Swiper
                            id="main"
                            tag="section"
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            pagination
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>
                            { renderVideoGallery() }
                        </Swiper> */}
                    </div>
                </div>
            </section>
        );
    }
}
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default Gallery;