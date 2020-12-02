import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";
import { downloadImageFromLink } from "../../services/downloadImageByUrl";
import { Button, Modal } from 'react-bootstrap';

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
                    <p className="card__title"><button onClick={this.handleShow} type="button" className="btn btn-outline-secondary"><i className="fas fa-eye" />
                    </button>
                    </p>
                    <p className="card__title"><button onClick={() => { downloadImageFromLink(this.props.itemSrc) }} type="button" className="btn btn-outline-secondary"><i className="fas fa-download" />
                    </button>
                    </p>
                    <p className="card__body">
                        <Link to={{ pathname: '/Testing', state: { imgSrc: this.props.itemSrc } }}>
                            <button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button>
                        </Link>
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
                        <Link to={{ pathname: '/Testing', state: { imgSrc: this.props.itemSrc } }}>
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
