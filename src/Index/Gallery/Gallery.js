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
import { DOWNLOAD_URL } from '../../utils/config.url'
import { Button, Modal } from 'react-bootstrap';
import { Link, } from "react-router-dom";
import {
    addToCollection, downloadImageByUrl, downloadMultiImagesByUrlsVers2,
    createCollection, getCollections, deleteCollection, removeItemFromCollection
} from '../../services/user.services'
import './Gallery.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Skeleton from '@material-ui/lab/Skeleton';
import { Alert, AlertTitle } from '@material-ui/lab';


class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isImg: true,
            isVideo: false,
            isOpenModal: false,
            isOpenModalVideo: false,

            // states for add to collection 
            isOpenModalSelectCollection: false,
            isOpenModalCreateCollection: false,
            itemUrl: "",
            itemType: "",
            mediaDTO: {},
            willUpdateModalCollections: false,
            dataCollections: null,
            isLoadingCollections: false,
            selectedCollectionIds: [],
            disableThreeBtnCollectionModal: false,
        };
    }

    componentDidMount() {

    }

    async componentDidUpdate() {
        if (this.state.willUpdateModalCollections) {
            await this.setState({ willUpdateModalCollections: false, isLoadingCollections: true, selectedCollectionIds: [] });
            const dataCollections = await getCollections(() => {
                // If not login -> redirect to login.
                this.props.history.push("/login", {
                    action: "addToCollection",
                    imgSrc: "itemUrl",
                    thumbnail: "",
                    type: "type",
                    platform: "platform",
                    id: "id",
                    source: "source"
                });
            });
            await this.setState({ dataCollections: dataCollections, isLoadingCollections: false });
        }
    }

    componentWillReceiveProps = (props) => {
        if (props.nameNetwork !== 'instagram') {
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

    handleShowModal = (url, dto) => {
        // If this modal is not shown => give it data, open it.
        if (!this.state.isOpenModal)
            this.setState({
                isOpenModalVideo: false,
                itemUrl: url,
                itemType: "picture",
                mediaDTO: dto
            });
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    handleShowModalVideo = (url, dto) => {
        if (!this.state.isOpenModalVideo)
            this.setState({
                isOpenModal: false,
                itemUrl: url,
                itemType: "video",
                mediaDTO: dto
            });
        this.setState({ isOpenModalVideo: !this.state.isOpenModalVideo });
    }

    handleShowModalSelectCollection = () => {
        this.setState({
            isOpenModalSelectCollection: !this.state.isOpenModalSelectCollection,
        });
    }

    handleSelectCollection = (event, id) => {
        let selectedIndex = this.state.selectedCollectionIds.indexOf(id);
        let newSelectedCollectionIds = this.state.selectedCollectionIds;

        if (selectedIndex === -1)
            newSelectedCollectionIds.push(id);
        else
            newSelectedCollectionIds.splice(selectedIndex, 1);

        this.setState({ selectedCollectionIds: newSelectedCollectionIds });
    }


    // ***** User's services handling function ******
    clickDownload = () => {
        const tempThis = this;
        downloadImageByUrl(tempThis.state.itemUrl, () => this.props.history.push('/login', {
            from: tempThis.props.location,
            action: "downloadSingleImage",
            imgSrc: tempThis.state.itemUrl
        }));
    }

    handleDownloadMultiImages = () => {
        if (this.props.dataGallery?.imagesData?.length)
            downloadMultiImagesByUrlsVers2(this.props.dataGallery.imagesData, () => this.props.history.push('/login'));
        else
            alert("Not found any image to download.")
    }

    // Flow: Click => Check auth tại get list collections => chọn 1 hoặc tạo mới collection để thêm vô => thêm.

    clickFavoriteBtnFromItem = (itemDTO)=>{
        (async ()=>{
            await this.setState({
                itemUrl: itemDTO.imgSrc,
                itemType: itemDTO.type,
                mediaDTO: {
                    isAdding: itemDTO.isAdding,
                    id: itemDTO.id,
                    source: itemDTO.source,
                    collectionId: itemDTO.collectionId,
                }
            });
    
            if(this.state.mediaDTO.isAdding)
                this.clickFavoriteBtn();
            else if(this.state.mediaDTO.isAdding === false) // Condition should compare with false, not check falsy.
                this.clickUnFavorite(this.state.mediaDTO.collectionId, this.state.mediaDTO.id);
        })();
    }
    
    // Click favorite btn to add image to a collection.
    clickFavoriteBtn = () => {
        // Change state and react will do the rest in componentDidUpdate
        this.setState({
            isOpenModalSelectCollection: true,
            willUpdateModalCollections: true
        });
    }
    // Click favorite btn again to un-favorite
    clickUnFavorite = (collectionId, itemId) => {
        // TODO Remove khỏi collection đã được nhưng chưa cập nhật cái icon tim,
        // NOTE Nếu add 1 item tới hơn 1 collection thì phải xóa số collection mà item đó được gắn vô, cd item thuộc về 2 collection thì phải xóa 2 lần.
        console.log("Un-favorite");
        (async () => {
            if (window.confirm("Are you sure want to remove this item from collection?")) {
            await removeItemFromCollection(collectionId, itemId);
            
            // whatever opening, after add to collection, all modals will be close immediately.
            await this.setState({isOpenModalSelectCollection: false, isOpenModal: false, isOpenModalVideo: false});
        }
        })()
    } 

    clickAddToCollection = () => {
        (async () => {
            await this.setState({ disableThreeBtnCollectionModal: true })
            if (this.state.selectedCollectionIds.length) {
                // if (window.confirm("Are you sure want to delete selected collection(s)?")) {
                    for (const idCollection of this.state.selectedCollectionIds)
                        await addToCollection(this.state.itemUrl, "", this.state.itemType, 
                            this.props.nameNetwork, this.state.mediaDTO.id, this.state.mediaDTO.source, 
                            idCollection);

                    // whatever opening, after add to collection, all modals will be close immediately.
                    await this.setState({isOpenModalSelectCollection: false, isOpenModal: false, isOpenModalVideo: false});
                // }
            }
            else
                alert("No collection selected.")
            this.setState({disableThreeBtnCollectionModal: false });
        })()
        
    }

    clickCreateCollection = () => {
        (async () => {
            await this.setState({ disableThreeBtnCollectionModal: true })
            let name = prompt("Enter collection's name:", "New collection");    
            if (name) {
                await createCollection(name);
                await this.setState({ willUpdateModalCollections: true});
                
            }
            else if(name !== null)
                alert("Please enter collection's name.")
            this.setState({disableThreeBtnCollectionModal: false });
        })()
    }

    clickDeleteCollection = () => {
        (async () => {
            await this.setState({ disableThreeBtnCollectionModal: true })
            if (this.state.selectedCollectionIds.length) {
                if (window.confirm("Are you sure want to delete selected collection(s)?")) {
                    for (const idCollection of this.state.selectedCollectionIds)
                        await deleteCollection(idCollection);

                    await this.setState({ willUpdateModalCollections: true});
                }
            }
            else
                alert("No collection selected.")
            this.setState({disableThreeBtnCollectionModal: false });
        })()
    }

    clickReloadCollections = () => {
        // In case of occurring errors, click this button to reload.
        this.setState({ willUpdateModalCollections: true });
    }
    // ***** End user's service. ******

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
                            itemSrc={img.url} 
                            handleModal={(url, dto) => {
                                // control modal with url
                                this.handleShowModal(url, dto);
                            }} 
                            isClickAddToCollection={(itemDTO)=>{
                                this.clickFavoriteBtnFromItem(itemDTO);
                            }} 
                            key={idx} history={this.props.history} isAdded={img.isAdded}
                            id={img.id} source={img.source} platform={this.props.nameNetwork}
                            collectionId={img.collectionId} 
                        />)
                }
                else {
                    // else: error occurred => Show pic 500
                    res = (<img className="justify-item-center"
                        src="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg" alt="500 error" />);
                }
            }
            return (res);
        }
        // Đã thêm dấu ? handle trả về null nhưng chưa test.
        const handleCountPost = () => {
            if (this.props.dataGallery.ownerMedia?.countPost)
                return this.props.dataGallery.ownerMedia.countPost;
            else if (this.props.dataGallery.ownerMedia?.count_video)
                return this.props.dataGallery.ownerMedia.count_video;
            else if (this.props.dataGallery.error)
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
                            countPost={handleCountPost()}
                            countFollowedBy={this.props.dataGallery.ownerMedia?.countFollowedBy}
                            nameNetwork={this.props.nameNetwork} />) : (
                        <OwnerMedia
                            avatar="https://www.wpexplorer.com/wp-content/uploads/wordpress-500-internal-server-error-fixes.jpg"
                            username="Error" fullname="Error" countPost="Error" countFollowedBy="Error"
                            nameNetwork={this.props.nameNetwork} />
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
                    if (this.props.nameNetwork === 'tiktok') {
                        return (
                        <VideoItem url={`${DOWNLOAD_URL}/${this.props.nameNetwork}?url=${this.props.inputUrl}`} 
                            handleModal={(url, dto) => {
                                // control modal with url
                                this.handleShowModalVideo(url, dto);
                            }} 
                            isClickAddToCollection={(itemDTO)=>{
                                this.clickFavoriteBtnFromItem(itemDTO);
                            }} 
                            isAuth={this.props.isAuth} isAdded={this.props.additionalInfoTiktok.isAdded}
                            id={this.props.additionalInfoTiktok.id} source={this.props.additionalInfoTiktok.source}
                            platform="tiktok" collectionId={this.props.additionalInfoTiktok.collectionId}>
                        </VideoItem>)
                    }
                    else {
                        if (this.props.dataGallery.videosData)
                            return (
                                (this.props.dataGallery.videosData.map((video, idx) =>
                                    <VideoItem url={video.url} key={idx} history={this.props.history} 
                                        handleModal={(url, dto) => {
                                            this.handleShowModalVideo(url, dto);
                                        }} 
                                        isClickAddToCollection={(itemDTO)=>{
                                            this.clickFavoriteBtnFromItem(itemDTO);
                                        }} 
                                        isAuth={this.props.isAuth} isAdded={video.isAdded}
                                        id={video.id} source={video.source} platform={this.props.nameNetwork} 
                                        collectionId={video.collectionId}/>
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
            if (this.props.nameNetwork !== 'tiktok') {
                if (Object.keys(this.props.dataGallery).length === 0 ||
                    !this.props.dataGallery.videosData || !this.props.dataGallery.imagesData) {
                    return ('');
                }
                else {
                    if (this.props.disableLoadMoreBtn) {
                        // 
                        return (
                            <div className="mt-3" style={{ width: '90%' }}>
                                {/* <div className="col-lg-8 col-md-8 col-sm-12"> */}
                                <button
                                    style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                    type="button" className="btn btn-danger justify-content-center download-all-btn" disabled>Load more media </button>
                                {/* </div> */}
                            </div>)
                    }
                    else {
                        return (
                            <div className="mt-3" style={{ width: '90%' }}>
                                {/* <div className="col-lg-8 col-md-8 col-sm-12"> */}
                                <button
                                    style={{ textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                                    type="button" className="btn btn-danger justify-content-center" onClick={this.props.getMoreMedia}>Load more media </button>
                                {/* </div> */}
                            </div>)
                    }
                }
            }
            else {
                return ("")
            }
        }
        const renderDownloadAllImageBtn = () => {
            if (Object.keys(this.props.dataGallery).length === 0) {
                return (null)
            }
            else if (!this.props.dataGallery.error) {
                if (this.props.isAuth) {
                    return (<button
                        style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                        type="button" className="btn btn-danger download-all-btn" onClick={this.handleDownloadMultiImages}>Download all {this.props.dataGallery?.imagesData.length} images
                    </button>)
                }
                else {
                    return (
                        <button
                            style={{ marginTop: '50px', textTransform: 'uppercase', fontFamily: 'Poppins', padding: '10px', backgroundColor: '#CD3D76' }}
                            type="button" className="btn btn-danger download-all-btn" onClick={() => { this.props.history.push('/login') }}>sign in to download
                        </button>
                    )
                }
            }
        }
        const renderCollections = () => {
            if (!this.state.isLoadingCollections && this.state.dataCollections) {
                if (this.state.dataCollections.error)
                    return (<>
                        <Button variant="secondary" onClick={() => this.setState({ willUpdateModalCollections: true })}>
                                Try again
                        </Button>
                        <br/>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <p>{this.state.dataCollections.error}</p>
                        </Alert>
                        </>)
                else
                    return (<div style={{ overflowY: 'scroll' }}>
                        {this.state.dataCollections.collections.map(
                            (collection, idx) =>
                                <FormGroup row key={idx}  >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.selectedCollectionIds.indexOf(collection.id) !== -1}
                                                onChange={(event) => this.handleSelectCollection(event, collection.id)}
                                                value="true"
                                                color="primary"
                                            />}
                                        label={collection.name}
                                    />
                                </FormGroup>
                        )}
                    </div>)
            }
            else {
                return (<div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>)
            }
        }
        const renderAddToCollection = ()=>{
            // Khi add to collection rồi, thì tắt modal, sau đó mở modal lên lại thì nút vẫn là add to collection thay vì remove from collection
            if(this.state.mediaDTO?.isAdding){
                return (
                    <Button variant="secondary" onClick={
                        () => {
                            // this.clickAddToCollection(this.state.itemUrl, "picture", this.props.nameNetwork, 
                            //                         this.state.mediaDTO.id, this.state.mediaDTO.source )
                            this.clickFavoriteBtn();
                        }
                    }>
                        Add to my collection
                    </Button>)
            }
            else if(!this.state.mediaDTO?.isAdding){
                return (
                    <Button variant="secondary" onClick={
                        () => {
                            // this.clickAddToCollection(this.state.itemUrl, "picture", this.props.nameNetwork, 
                            //                         this.state.mediaDTO.id, this.state.mediaDTO.source )
                            this.clickUnFavorite(this.state.mediaDTO.collectionId, this.state.mediaDTO.id);
                        }
                    }>
                        Remove this from collection
                    </Button>)
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

                    <div id="image-tab-gallery" className="row gallery-tab" style={{ display: this.state.isImg ? "" : "none" }}>
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

                    <div id="video-tab-gallery" className="row gallery-tab " style={{ display: this.state.isVideo ? "" : "none" }}>
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
                        onHide={() => this.handleShowModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Image previewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                <img className='img-fluid' width={1100} height={1000} style={{ objectFit: 'cover' }} src={this.state.itemUrl} alt="Img-error" />
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Link to={{ pathname: '/editor', state: { imgSrc: this.state.itemUrl } }}>
                                <Button variant="secondary">
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="secondary"
                                onClick={this.clickDownload}>
                                Download
                            </Button>
                            {renderAddToCollection()}
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        size="xl"
                        scrollable={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.isOpenModalVideo}
                        onHide={() => this.handleShowModalVideo()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Video previewer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Prevent user download video if not logged in. */}
                            {
                                this.props.isAuth ?
                                    <ReactPlayer className="videoFrame" url={this.state.itemUrl} controls={true} playing /> :
                                    <ReactPlayer className="videoFrame" url={this.state.itemUrl} controls={true} config={{ file: { attributes: { controlsList: 'nodownload' } } }} onContextMenu={e => e.preventDefault()} playing />
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={
                                // () => this.clickAddToCollection(this.state.itemUrl, "video", this.props.nameNetwork,
                                //     this.state.mediaDTO.id, this.state.mediaDTO.source)
                                ()=>this.clickFavoriteBtn()
                            }>
                                Add to my collection
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        size="xl"
                        scrollable={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={this.state.isOpenModalSelectCollection}
                        onHide={() => this.handleShowModalSelectCollection()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select a collection</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {renderCollections()}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.clickAddToCollection()} disabled={this.state.disableThreeBtnCollectionModal}>
                                Add to this collection
                            </Button>
                            <Button variant="secondary" onClick={() => this.clickCreateCollection()} disabled={this.state.disableThreeBtnCollectionModal}>
                                Create a new collection
                            </Button>
                            <Button variant="secondary" onClick={() => this.clickDeleteCollection()} disabled={this.state.disableThreeBtnCollectionModal}>
                                Remove this collection
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