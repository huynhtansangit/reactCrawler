import React, { Component } from 'react';
import {Link,} from "react-router-dom";
import { downloadImageByUrl } from "../../services/user.services";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import {addToCollection} from '../../services/user.services'


class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
            isRedirect: false,
            isOpenModal: false,
            itemDTO: {},
        }
    }

    async prepareData(){
        await this.setState({itemDTO: {
            isAdding: !this.props.isAdded,
            imgSrc: this.props.itemSrc,
            thumbnail: "",
            type:"picture",
            platform: this.props.platform, 
            id: this.props.id, 
            source: this.props.source,
            collectionId: this.props.collectionId,
        }})
    }

    // arrow 2 level cho ngầu. :v điều này sẽ làm thay đổi khi gọi hàm this.handleShow ở dưới.
    // Func below is no longer in need due to movement of modal to Gallery.js
    // handleShow = ()=>() => {
    //     this.setState({ isOpenModal: !this.state.isOpenModal })
    // }

    clickDownload = ()=>{
        const tempThis = this; 
        downloadImageByUrl(this.props.imgSrc, ()=>this.props.history.push('/login', {
            from: tempThis.props.location,
            action: "downloadSingleImage",
            imgSrc: tempThis.props.itemSrc
        }));
    }

    clickAddToCollection = ()=>{
        const tempThis = this;
        addToCollection(this.props.itemSrc, "", "picture", this.props.platform, this.props.id, this.props.source, ()=>{
            // If not login -> redirect to login.
            this.props.history.push("/login", {
                from: tempThis.props.location,
                action: "addToCollection",
                imgSrc: tempThis.props.itemSrc,
                thumbnail: "",
                type:"picture",
                platform: this.props.platform, 
                id: this.props.id, 
                source: this.props.source
            });
        })
    }
    
    render() {
        return (
            <div className="img-card" variant="primary">
                <img src={this.props.itemSrc} alt="Img-error" />
                <div className="card__text">
                    <p className="card__title">
                        <button 
                            onClick={ ()=>{
                                // Click here will trigger show modal in Gallery.
                                this.props.handleModal(this.props.itemSrc, {id: this.props.id, source: this.props.source, platform: this.props.platform, isAdding: !this.props.isAdded, collectionId: this.props.collectionId})
                            }} 
                            type="button" className="btn btn-outline-secondary">
                            <VisibilityOutlinedIcon/>
                        </button>
                    </p>
                    <p className="card__title"><button onClick={this.clickDownload} type="button" className="btn btn-outline-secondary">
                    <GetAppOutlinedIcon/>
                    </button>
                    </p>
                    <p className="card__title">
                        <Link to={{ pathname: '/editor', state: { imgSrc: this.props.itemSrc } }}>
                            <button type="button" className="btn btn-outline-secondary"><EditOutlinedIcon/></button>
                        </Link>
                    </p>
                    <p className="card__title">
                            <button type="button" className={`btn btn-outline-secondary ${this.props.isAdded ? 'selectedBtn' : ""}`}
                            onClick={async ()=>{
                                await this.prepareData();
                                this.props.isClickAddToCollection(this.state.itemDTO);
                            }}>
                                <FavoriteTwoToneIcon/>
                            </button>
                    </p>
                </div>
            </div>
        );
    }
}
export default ImageItem;
