import React, { Component } from 'react';
import {Link,} from "react-router-dom";
import { downloadImageByUrl } from "../../services/user.services";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import addToCollection from '../../services/user.services'

// FIXME New format data returned is not adapted with this model by now
class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
            isRedirect: false,
            isOpenModal: false,
        }
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
        addToCollection(this.props.itemSrc,"","picture",()=>{
            // If not login -> redirect to login.
            this.props.history.push("/login", {
                from: tempThis.props.location,
                action: "addToCollection",
                imgSrc: tempThis.props.itemSrc,
                thumbnail: "",
                type:"picture"
            });
        })
    }
    
    render() {
        return (
            <div className="img-card" variant="primary">
                <img src={this.props.itemSrc} alt="Img-error" />
                <div className="card__text">
                    <p className="card__title"><button onClick={ ()=>{
                        // this.handleShow()
                        
                        // Click here will trigger show modal in Gallery.
                        this.props.handleModal(this.props.itemSrc, {id: this.props.id, source: this.props.source})
                    }} type="button" className="btn btn-outline-secondary">
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
                            <button type="button" className="btn btn-outline-secondary"
                            onClick={this.clickAddToCollection}>
                                <FavoriteTwoToneIcon/>
                            </button>
                    </p>
                </div>

                {/* Modal will be moved to Gallery unless react will have to create 40 modal 
                corresponding to 40 ImageItem every time it render, and this render func called a lot.  */}
                {/* <Modal
                    size="xl"
                    scrollable={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isOpenModal}
                    onHide={this.handleShow()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image previewer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <img className='img-fluid' width={1100} height={1000} style={{objectFit: 'cover'}} src={this.props.itemSrc} alt="Img-error" />
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={{ pathname: '/editor', state: { imgSrc: this.props.itemSrc } }}>
                            <Button variant="secondary">
                                Edit
                            </Button>
                        </Link>
                        <Button variant="secondary" 
                        onClick={this.clickDownload}>
                            Download
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        );
    }
}
export default ImageItem;
