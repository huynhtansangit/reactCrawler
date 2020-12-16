import React, { Component } from 'react';
import ImageItem from './ImageItem';
import OwnerMedia from './OwnerMedia';
// import Swiper core and required components
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';
import VideoItem from './VideoItem';
import ReactPlayer from 'react-player'
import {DOWNLOAD_URL} from '../../utils/config.url'
import { Button, Modal } from 'react-bootstrap';
import {Link,} from "react-router-dom";
import addToCollection, { downloadImageByUrl, downloadMultiImagesByUrlsVers2 } from '../../services/user.services'
import './Gallery.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImg: true,
            isVideo: false,
            isOpenModal: false,
            isOpenModalVideo: false,
            imageItemSrc: "",
            downloadAllImagesStatus: "ready",
        };
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps = (props)=> {
        if(props.nameNetwork !== 'instagram'){
            this.activeVideoTab();
        }
    }

    activePhotoTab = () => {
        this.setState({ isImg: true })
        this.setState({ isVideo: false })
    }

    activeVideoTab = () => {
        this.setState({ isVideo: true })
        this.setState({ isImg: false })
    }

    handleShowModal = (url) => {
        this.setState({ 
            isOpenModal: !this.state.isOpenModal, 
            isOpenModalVideo: false,
            imageItemSrc: url 
        });
    }

    clickDownload = ()=>{
        const tempThis = this;
        downloadImageByUrl(this.props.itemSrc, ()=>this.props.history.push('/login', {
            from: tempThis.props.location,
            action: "downloadSingleImage",
            imgSrc: tempThis.state.imageItemSrc
        }));
    }

    handleDownloadMultiImages = ()=>{
        if(this.props.dataGallery?.imagesData?.length)
            downloadMultiImagesByUrlsVers2(this.props.dataGallery.imagesData, ()=>this.props.history.push('/login'));
        else
            alert("Not found any image to download.")
    }

    clickAddToCollection = (itemUrl, type)=>{
        const tempThis = this;
        addToCollection(itemUrl, "", type,()=>{
            // If not login -> redirect to login.
            this.props.history.push("/login", {
                from: tempThis.props.location,
                action: "addToCollection",
                imgSrc: itemUrl,
                thumbnail: "",
                type:type
            });
        })
    }

    handleShowModalVideo = (url) => {
        this.setState({ 
            isOpenModalVideo: !this.state.isOpenModalVideo, 
            isOpenModal: false,
            videoItemSrc: url 
        });
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
                        <ImageItem
                        itemSrc={img.url} handleModal = {(url)=>{
                            // control modal with url
                            // console.log(url);
                            this.handleShowModal(url);
                        }} key={idx} history={this.props.history}/>)
                }
                else {
                    // else: error occurred => Show pic 500
                    res = (<img className="justify-item-center"
                        src="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg" alt="500 error" />);
                }
            }
            return (res);
        }
        // Đã thêm dấu ? handle nhưng chưa test.
        const handleCountPost = () =>{
            if(this.props.dataGallery.ownerMedia?.countPost)
                return this.props.dataGallery.ownerMedia.countPost;
            else if(this.props.dataGallery.ownerMedia?.count_video)
                return this.props.dataGallery.ownerMedia.count_video;
            else if(this.props.dataGallery.error)
                return 0;
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
                        <OwnerMedia avatar={this.props.dataGallery.ownerMedia?.avatar}
                            username={this.props.dataGallery.ownerMedia?.username}
                            fullname={this.props.dataGallery.ownerMedia?.fullname}
                            countPost={ handleCountPost() }
                            countFollowedBy={this.props.dataGallery.ownerMedia?.countFollowedBy} 
                            nameNetwork={this.props.nameNetwork}/>) : (
                        <OwnerMedia
                            avatar="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg"
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
                        return(<VideoItem url={`${DOWNLOAD_URL}/${this.props.nameNetwork}?url=${this.props.inputUrl}`} handleModal = {(url)=>{
                            // control modal with url
                            // console.log(url);
                            this.handleShowModalVideo(url);
                        }} isAuth={this.props.isAuth}></VideoItem>)
                    }
                    else{
                        if(this.props.dataGallery.videosData)
                        return (
                            (this.props.dataGallery.videosData.map((video, idx) =>
                                <VideoItem url={video.url} key={idx} history={this.props.history} handleModal = {(url)=>{
                                    // control modal with url
                                    // console.log(url);
                                    this.handleShowModalVideo(url);
                                }} isAuth={this.props.isAuth}/>
                            )))
                    }
                }
                else {
                    // else: error occurred => Show pic 500
                    return ((<img className="justify-item-center"
                        src="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg" alt="server error" />))
                }
            }
        }
        const renderLoadMoreButton = () => {
            // Load more only available with instagram and fb
            if(this.props.nameNetwork !== 'tiktok'){
                if (Object.keys(this.props.dataGallery).length === 0 ||
                    !this.props.dataGallery.videosData || !this.props.dataGallery.imagesData) {
                    return ('');
                }
                else {
                    if (this.props.disableLoadMoreBtn) {
                        // 
                        return (
                            <div className="mt-3" style={{width: '95%'}}>
                                {/* <div className="col-lg-8 col-md-8 col-sm-12"> */}
                                    <button
                                        style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                        type="button" className="btn btn-danger justify-content-center" disabled>Load more media </button>
                                {/* </div> */}
                            </div>)
                    }
                    else {
                        return (
                            <div className="mt-3" style={{width: '95%'}}>
                                {/* <div className="col-lg-8 col-md-8 col-sm-12"> */}
                                    <button
                                        style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                        type="button" className="btn btn-danger justify-content-center" onClick={this.props.getMoreMedia}>Load more media </button>
                                {/* </div> */}
                            </div>)
                    }
                }
            }
            else{
                return("")
            }
        }

        const renderDownloadAllImageBtn = ()=>{
            if(Object.keys(this.props.dataGallery).length === 0){
                return(null)
            }
            else if(!this.props.dataGallery.error){
                if(this.props.isAuth){
                    return(<button
                        style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                        type="button" className="btn btn-danger" onClick={this.handleDownloadMultiImages}>Download all {this.props.dataGallery?.imagesData.length} images
                    </button>)
                }
                else{
                    return(
                        <button
                            style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                            type="button" className="btn btn-danger" onClick={()=>{this.props.history.push('/login')}}>sign in to download
                        </button>
                        )
                }
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
                        <div id="btn-image-gallery" className={"btn photo-btn col-sm" + (this.state.isImg ? ' active' : ' ')} onClick={this.activePhotoTab}>
                            <span>IMAGE TAB</span>
                        </div>
                        <div id="btn-video-gallery" className={"btn video-btn col-sm" + (this.state.isVideo ? ' active' : ' ')} onClick={this.activeVideoTab}>
                            <span>VIDEO TAB</span>
                        </div>
                    </div>

                    <div id="image-tab-gallery" className="row gallery-tab" style={{display: this.state.isImg ? "" : "none"}}>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className=" image-video-container justify-content-center">
                                {renderImageGallery()}
                            </div>
                            {renderLoadMoreButton()}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {renderOwnerMedia()}
                            
                            {renderDownloadAllImageBtn()}
                        </div>
                    </div>
                    
                    <div id="video-tab-gallery" className="row gallery-tab " style={{display: this.state.isVideo ? "" : "none"}}>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="image-video-container justify-content-center">
                                {renderVideoGallery()}
                            </div>
                            {renderLoadMoreButton()}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                            {renderOwnerMedia()}
                        </div>
                    </div>
                    <Modal
                        size="xl"
                        scrollable={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.isOpenModal}
                        onHide={()=>this.handleShowModal(this.state.imageItemSrc)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Image previewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                <img className='img-fluid' width={1100} height={1000} style={{objectFit: 'cover'}} src={this.state.imageItemSrc} alt="Img-error" />
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to={{ pathname: '/editor', state: { imgSrc: this.state.imageItemSrc } }}>
                                <Button variant="secondary">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="secondary" 
                            onClick={this.clickDownload}>
                                Download
                            </Button>
                            <Button variant="secondary" 
                            onClick={()=>this.clickAddToCollection(this.state.imageItemSrc, "picture")}>
                                Add to my collection
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        size="xl"
                        scrollable={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.isOpenModalVideo}
                        onHide={()=>this.handleShowModalVideo(this.state.videoItemSrc)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Video previewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Prevent user download video if not logged in. */}
                            {
                                this.props.isAuth ? 
                                <ReactPlayer className="videoFrame" url={this.state.videoItemSrc} controls={true} playing /> :
                                <ReactPlayer className="videoFrame" url={this.state.videoItemSrc} controls={true} config={{ file: { attributes: { controlsList: 'nodownload' } } }} onContextMenu={e => e.preventDefault()} playing />
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.clickAddToCollection(this.state.videoItemSrc, "video")}>
                                Add to my collection
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        );
    }
}
// install Swiper components
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
export default Gallery;