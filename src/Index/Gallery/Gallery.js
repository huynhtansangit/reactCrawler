import React, { Component } from 'react';
import ImageItem from './ImageItem';
import OwnerMedia from './OwnerMedia';
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
import auth from '../../auth/auth'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';


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
            isImageAddedHashedTable: {},
            isVideoAddedHashedTable: {},
            showCollectionItemBelong: false,
        };
    }

    componentDidMount() {
    }

    async processIsAddedHashedTable(dataGallery, additionalInfoTiktok){
        let dataImageHashedTable = {};
        let dataVideoHashedTable = {};
        
        if(this.props.nameNetwork !== 'tiktok'){
            if(dataGallery?.imagesData)
                for(const item of dataGallery.imagesData)
                    dataImageHashedTable[item.id] = item.collectionId ? item.collectionId : [];
            
            if(dataGallery?.videosData)
                for(const item of dataGallery.videosData)
                    dataVideoHashedTable[item.id] = item.collectionId ? item.collectionId : [];
        }
        else{
            dataVideoHashedTable[additionalInfoTiktok.id] = additionalInfoTiktok.collectionId;
        }
        await this.setState({
            isImageAddedHashedTable: dataImageHashedTable,
            isVideoAddedHashedTable: dataVideoHashedTable,
        })
    }

    async updateIsAddedHashedTable(itemId, collectionId, type, action){
        if(type === "picture"){
            let newIsImageAddedHashedTable = {...this.state.isImageAddedHashedTable};
            
            if(action==='add'){
                newIsImageAddedHashedTable[itemId].push(collectionId);
            }
            else if(action==='remove'){
                newIsImageAddedHashedTable[itemId].splice(newIsImageAddedHashedTable[itemId].indexOf(collectionId), 1);
            }

            await this.setState({isImageAddedHashedTable: newIsImageAddedHashedTable});
        }
        else if(type === 'video'){
            let newIsVideoAddedHashedTable = {...this.state.isVideoAddedHashedTable};
            
            if(action==='add'){
                newIsVideoAddedHashedTable[itemId].push(collectionId);
            }
            else if(action==='remove'){
                newIsVideoAddedHashedTable[itemId].splice(newIsVideoAddedHashedTable[itemId].indexOf(collectionId), 1);
            }

            await this.setState({isVideoAddedHashedTable: newIsVideoAddedHashedTable});
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.state.willUpdateModalCollections) {
            await this.setState({ willUpdateModalCollections: false, isLoadingCollections: true, selectedCollectionIds: [] });
            await auth.verifyAccessToken();
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
        else if(this.state.showCollectionItemBelong){
            if(this.state.itemType === "picture"){
                await this.setState({
                    selectedCollectionIds: this.state.isImageAddedHashedTable[this.state.mediaDTO.id]?.length ? this.state.isImageAddedHashedTable[this.state.mediaDTO.id] : [], 
                    showCollectionItemBelong: false});
            }
            else{
                await this.setState({
                    selectedCollectionIds: this.state.isVideoAddedHashedTable[this.state.mediaDTO.id]?.length ? this.state.isVideoAddedHashedTable[this.state.mediaDTO.id] : [], 
                    showCollectionItemBelong: false});
            }
            
        }
        else if(prevProps.additionalInfoTiktok !== this.props.additionalInfoTiktok){
            await this.processIsAddedHashedTable(this.props.dataGallery, this.props.additionalInfoTiktok);
        }
        else if(!this.props.dataGallery?.loading){
            // This case will include componentDidMount.
            if(this.props.dataGallery?.imagesData?.length !== prevProps.dataGallery?.imagesData?.length && 
                this.props.dataGallery?.videosData?.length !== prevProps.dataGallery?.videosData?.length){
                    await this.processIsAddedHashedTable(this.props.dataGallery, this.props.additionalInfoTiktok);
                }
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
        // let newSelectedCollectionIds = [...this.state.selectedCollectionIds];

        // if (selectedIndex === -1)
        //     newSelectedCollectionIds.push(id);
        // else
        //     newSelectedCollectionIds.splice(selectedIndex, 1);

        this.setState({ selectedCollectionIds: selectedIndex === -1 ? [...this.state.selectedCollectionIds, id]: [...this.state.selectedCollectionIds].filter((item,index)=>index!==selectedIndex)  });
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
                    id: itemDTO.id,
                    source: itemDTO.source,
                    collectionId: itemDTO.collectionId,
                },
                // For showing modal select collection
                isOpenModalSelectCollection: true,
                willUpdateModalCollections: true,
            });
            // Tell apart because I think this will change the flow of render
            await this.setState({ showCollectionItemBelong: true,});
        })();
    }
    
    // Click favorite btn to add image to a collection.
    clickFavoriteBtn = async () => {
        // Change state and react will do the rest in componentDidUpdate
        await this.setState({
            isOpenModalSelectCollection: true,
            willUpdateModalCollections: true,
        });

        await this.setState({
            showCollectionItemBelong: true,
        });
    }
    // Click favorite btn again to un-favorite
    clickUnFavorite = (collectionIds, itemId) => {
        // CollectionIds: array containing collection where item is current in.
        (async () => {
        if (this.state.selectedCollectionIds.length) {
            if (window.confirm("Are you sure want to remove this item from collection?")) {
                for (const idCollection of this.state.selectedCollectionIds){
                    // only able to remove from collection if item is in it.
                    if(collectionIds.includes(idCollection)){
                        const isSuccess = await removeItemFromCollection(idCollection, itemId);
                        if(isSuccess)
                            await this.updateIsAddedHashedTable(this.state.mediaDTO.id, idCollection, this.state.itemType, "remove");
                    }
                    else
                        alert ("This item does not belong to this collection");
                }
            
                // whatever opening, after add to collection, all modals will be close immediately.
                await this.setState({isOpenModalSelectCollection: false, isOpenModal: false, isOpenModalVideo: false});
            }
        }
        else
            alert("No collection selected.")
        })()
    } 

    clickAddToCollection = () => {
        (async () => {
            await this.setState({ disableThreeBtnCollectionModal: true })
            if (this.state.selectedCollectionIds.length) {
                for (const idCollection of this.state.selectedCollectionIds){
                    const isSuccess = await addToCollection(this.state.itemUrl, "", this.state.itemType, 
                        this.props.nameNetwork, this.state.mediaDTO.id, this.state.mediaDTO.source, 
                        idCollection);
                    if(isSuccess)
                        await this.updateIsAddedHashedTable(this.state.mediaDTO.id, idCollection, this.state.itemType, "add");
                }
                
                // whatever opening, after add to collection, all modals will be close immediately.
                await this.setState({isOpenModalSelectCollection: false, isOpenModal: false, isOpenModalVideo: false});
            }
            else
                alert("No collection selected.")

            await this.setState({disableThreeBtnCollectionModal: false });
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

    clickDeleteCollection = (collectionId) => {
        (async () => {
            await this.setState({ disableThreeBtnCollectionModal: true })
            if (window.confirm("Are you sure want to delete selected collection(s)?")) {
                await deleteCollection(collectionId);

                await this.setState({ willUpdateModalCollections: true});
            }
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
                            key={idx} history={this.props.history} isAdded={this.state.isImageAddedHashedTable[img.id]?.length ? true : false}
                            id={img.id} source={img.source} platform={this.props.nameNetwork}
                            collectionId={this.state.isImageAddedHashedTable[img.id]} 
                        />)
                }
                else {
                    // else: error occurred => Show pic 500
                    if(this.props.dataGallery.error === "404"){
                        res = (<img className="justify-item-center"
                        src="https://www.intellezy.com/img/error-404.png" alt="404 error" />);
                    }
                    else{
                        res = (<img className="justify-item-center"
                            src="https://www.tropicalserver.com/wp-content/uploads/2018/01/error-500-1.jpg" alt="500 error" />);
                    }
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
                                this.props.dataGallery.error === "404" ?
                                    <OwnerMedia
                                        avatar="https://www.intellezy.com/img/error-404.png"
                                        username="Error" fullname="Error" countPost="Error" countFollowedBy="Error"
                                        nameNetwork={this.props.nameNetwork} /> :
                                
                                    <OwnerMedia
                                        avatar="https://www.tropicalserver.com/wp-content/uploads/2018/01/error-500-1.jpg"
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
                            isAuth={this.props.isAuth} isAdded={this.state.isVideoAddedHashedTable[this.props.additionalInfoTiktok.id]?.length ? true: false}
                            id={this.props.additionalInfoTiktok.id} source={this.props.additionalInfoTiktok.source}
                            platform="tiktok" 
                            collectionId={this.state.isVideoAddedHashedTable[this.props.additionalInfoTiktok.id]}>
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
                                        isAuth={this.props.isAuth} isAdded={this.state.isVideoAddedHashedTable[video.id]?.length ? true: false}
                                        id={video.id} source={video.source} platform={this.props.nameNetwork} 
                                        collectionId={this.state.isVideoAddedHashedTable[video.id]}/>
                                )))
                    }
                }
                else {
                    // else: error occurred => Show pic 500
                    if(this.props.dataGallery.error === "404"){
                        return (<img className="justify-item-center"
                        src="https://www.intellezy.com/img/error-404.png" alt="404 error" />);
                    }
                    else{
                        return (<img className="justify-item-center"
                            src="https://www.tropicalserver.com/wp-content/uploads/2018/01/error-500-1.jpg" alt="500 error" />);
                    }
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
                if(this.state.dataCollections?.collections)
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
                                    {/* onClick={()=>this.clickDeleteCollection(collection.id)} */}
                                    <IconButton aria-label="delete" 
                                        onClick={()=>this.clickDeleteCollection(collection.id)}
                                        style={{paddingTop:'0',paddingLeft:'0'}}
                                        disabled={this.state.disableThreeBtnCollectionModal}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </FormGroup>
                        )}
                    </div>)
                else
                    return (<>
                        <Button variant="secondary" onClick={() => this.setState({ willUpdateModalCollections: true })}>
                                Try again
                        </Button>
                        <br/>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <p>{this.state.dataCollections?.error}</p>
                        </Alert>
                        </>)
            }
            else {
                return (<div>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>)
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
                            <Button variant="secondary" onClick={
                                () => {
                                    this.clickFavoriteBtn();
                                }}>
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
                                () => {
                                    this.clickFavoriteBtn();
                                }}>
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
                            {
                                this.state.itemType === 'picture' ? 
                                <Button variant="secondary" onClick={() => this.clickUnFavorite(this.state.isImageAddedHashedTable[this.state.mediaDTO.id], this.state.mediaDTO.id)} disabled={this.state.disableThreeBtnCollectionModal}>
                                    Remove image from this collection
                                </Button> :
                                <Button variant="secondary" onClick={() => this.clickUnFavorite(this.state.isVideoAddedHashedTable[this.state.mediaDTO.id], this.state.mediaDTO.id)} disabled={this.state.disableThreeBtnCollectionModal}>
                                    Remove video from this collection
                                </Button> 
                            }
                            <Button variant="secondary" onClick={() => this.clickCreateCollection()} disabled={this.state.disableThreeBtnCollectionModal}>
                                Create a new collection
                            </Button>
                            {/* <Button variant="secondary" onClick={() => this.clickDeleteCollection()} disabled={this.state.disableThreeBtnCollectionModal}>
                                Remove this collection
                            </Button> */}
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        );
    }
}

export default Gallery;