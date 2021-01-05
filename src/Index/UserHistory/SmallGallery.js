import React, { useEffect, useState } from 'react';
import VideoItem from '../Gallery/VideoItem';
import ImageItem from '../Gallery/ImageItem';
import { DOWNLOAD_URL } from '../../utils/config.url'
import OwnerMedia from '../Gallery/OwnerMedia';

const SmallGallery = (props) =>  {
    const [isSelectImageTab, setSelectImageTab] = useState(true); 

    useEffect(()=>{
        if(props.nameNetwork !== 'instagram')
            setSelectImageTab(false);
    }, []) //eslint-disable-line

    const activeTab = (type) => {
        if(type === 'image')
            setSelectImageTab(true);
        else
            setSelectImageTab(false);
    }

    const renderImageGallery = () => {
        let res;
        if (props.isLoading) {
            // Check if data is null => Show loading
            res = <img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif" alt="loading" />
        }
        else {
            if (!props.error) {
                // If not error => Show images
                res = props.dataGallery.imagesData.map((img, idx) =>
                    <ImageItem
                        itemSrc={img.url} 
                        handleModal={(url, dto) => {
                            // control modal with url
                            this.handleShowModal(url, dto);
                        }} 
                        isClickAddToCollection={(itemDTO)=>{
                            this.clickFavoriteBtnFromItem(itemDTO);
                        }} 
                        key={idx} history={props.history}
                        id={img.id} source={img.source} platform={props.nameNetwork}
                        isInHistoryPage={true}
                    />)
            }
            else {
                // else: error occurred => Show pic 500
                if(props.error === "404"){
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

    const renderVideoGallery = () => {
        if (props.isLoading) {
            // Check if data is null => Show loading
            return (<img className="justify-item-center" src="https://img.idesign.vn/2018/10/23/id-loading-1.gif" alt="loading" />)
        }
        else {
            // Else: loaded
            if (!props.error) {
                // If not error => Show images
                if (props.nameNetwork === 'tiktok') {
                    return (
                    <VideoItem url={`${DOWNLOAD_URL}/${props.nameNetwork}?url=${props.inputUrl}`} 
                        handleModal={(url, dto) => {
                            // control modal with url
                            // handleShowModalVideo(url, dto);
                        }} 
                        isClickAddToCollection={(itemDTO)=>{
                            // clickFavoriteBtnFromItem(itemDTO);
                        }} 
                        isAuth={props.isAuth}
                        // id={props.additionalInfoTiktok.id} source={props.additionalInfoTiktok.source}
                        platform="tiktok"
                        isInHistoryPage={true}> 
                    </VideoItem>)
                }
                else {
                    if (props.dataGallery.videosData)
                        return (
                            (props.dataGallery.videosData.map((video, idx) =>
                                <VideoItem url={video.url} key={idx} history={props.history} 
                                    handleModal={(url, dto) => {
                                        // handleShowModalVideo(url, dto);
                                    }} 
                                    isClickAddToCollection={(itemDTO)=>{
                                        // clickFavoriteBtnFromItem(itemDTO);
                                    }} 
                                    isAuth={props.isAuth}
                                    id={video.id} source={video.source} platform={props.nameNetwork} 
                                    isInHistoryPage={true}
                                />
                            )))
                }
            }
            else {
                // else: error occurred => Show pic 500
                if(props.error === "404"){
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

    const handleCountPost = () => {
        if (props.dataGallery.ownerMedia?.countPost)
            return props.dataGallery.ownerMedia.countPost;
        else if (props.dataGallery.ownerMedia?.count_video)
            return props.dataGallery.ownerMedia.count_video;
        else if (props.dataGallery.error)
            return 0;
        else
            return 1;
    }

    const renderOwnerMedia = () => {
        if (props.isLoading) {
            return (<OwnerMedia avatar="https://img.idesign.vn/2018/10/23/id-loading-1.gif" username="Loading"
                fullname="Loading" countPost="Loading" countFollowedBy="Loading" />)
        }
        else {
            return (!props.dataGallery.error ?
                (
                    <OwnerMedia avatar={props.dataGallery.ownerMedia?.avatar}
                        username={props.dataGallery.ownerMedia?.username}
                        fullname={props.dataGallery.ownerMedia?.fullname}
                        countPost={handleCountPost()}
                        countFollowedBy={props.dataGallery.ownerMedia?.countFollowedBy}
                        nameNetwork={props.nameNetwork} 
                        isInHistoryPage={true}/>) : (
                            props.dataGallery.error === "404" ?
                                <OwnerMedia
                                    avatar="https://www.intellezy.com/img/error-404.png"
                                    username="Error" fullname="Error" countPost="Error" countFollowedBy="Error"
                                    nameNetwork={props.nameNetwork} /> 
                                    :
                                <OwnerMedia
                                    avatar="https://www.tropicalserver.com/wp-content/uploads/2018/01/error-500-1.jpg"
                                    username="Error" fullname="Error" countPost="Error" countFollowedBy="Error"
                                    nameNetwork={props.nameNetwork}/>
                ))
        }
    }
    return(
        <>
            <div className="row">
                <div id="btn-image-gallery" className={"btn photo-btn col-sm" + (isSelectImageTab ? ' active' : ' ')} onClick={()=>activeTab('image')}>
                    <span>IMAGE TAB</span>
                </div>
                <div id="btn-video-gallery" className={"btn video-btn col-sm" + (!isSelectImageTab ? ' active' : ' ')} onClick={()=>activeTab('video')}>
                    <span>VIDEO TAB</span>
                </div>
            </div>

            <div id="image-tab-gallery" className="row gallery-tab" style={{ display: isSelectImageTab ? "" : "none" }}>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className=" image-video-container justify-content-center">
                        {renderImageGallery()}
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                    {renderOwnerMedia()}
                </div>
            </div>

            <div id="video-tab-gallery" className="row gallery-tab " style={{ display: !isSelectImageTab ? "" : "none" }}>
                <div className="col-lg-9 col-md-9 col-sm-12">
                    <div className="image-video-container justify-content-center">
                        {renderVideoGallery()}
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 info-container offset-1"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>
                    {renderOwnerMedia()}
                </div>
            </div>
        </>
    )
}


export default SmallGallery