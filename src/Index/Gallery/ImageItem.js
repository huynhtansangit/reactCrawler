import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";
import { downloadImageFromLink } from "../../services/downloadImageByUrl";
import { Button, Modal } from 'react-bootstrap';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import addToCollection from '../../services/user.services'


class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
            isRedirect: false,
            isOpenModal: false,
        }
    }

    handleShow = () => {
        this.setState({ isOpenModal: !this.state.isOpenModal })
    }
    render() {
        return (
            <div className="img-card" variant="primary">
                <img src={this.props.itemSrc} alt="Img-error" />
                <div className="card__text">
                    <p className="card__title"><button onClick={this.handleShow} type="button" className="btn btn-outline-secondary">
                    <VisibilityOutlinedIcon/>
                    </button>
                    </p>
                    <p className="card__title"><button onClick={() => { downloadImageFromLink(this.props.itemSrc) }} type="button" className="btn btn-outline-secondary">
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
                            onClick={()=>{addToCollection(this.props.itemSrc,"","picture",()=>{
                                // If not login -> redirect to login.
                                this.props.history.push("/login");
                            })
                            }}>
                                <FavoriteTwoToneIcon/>
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
                            <img className='img-fluid' width={1100} height={1000} style={{objectFit: 'cover'}} src={this.props.itemSrc} alt="Img-error" />
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={{ pathname: '/editor', state: { imgSrc: this.props.itemSrc } }}>
                            <Button variant="secondary">
                                Edit
                            </Button>
                        </Link>
                        <Button variant="secondary" onClick={() => { downloadImageFromLink(this.props.itemSrc) }}>
                            Download
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ImageItem;
