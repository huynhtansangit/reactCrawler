import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";
import { downloadFromLink } from "../../services/downloadImageByUrl";
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
        function getModalStyle() {
            const top = 10;
            const left = 10;

            return {
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(${top}%, ${left}%)`,
            };
        }
        return (
            <div className="img-card" variant="primary" onClick={() => { this.handleShow() }}>
                <img src={this.props.itemSrc} alt="Img-error" />
                <div className="card__text">
                    <p className="card__title"><button onClick={() => { downloadFromLink(this.props.itemSrc) }} type="button" className="btn btn-outline-secondary"><i className="fas fa-download" />
                    </button>
                    </p>
                    <p className="card__body">
                        <Link to={{ pathname: '/Testing', state: { imgSrc: this.props.itemSrc } }}>
                            <button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button>
                        </Link>
                    </p>
                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.isOpenModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image previewer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <img width={800} height={800} src={this.props.itemSrc} alt="Img-error" />
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.handleShow() }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default ImageItem;
