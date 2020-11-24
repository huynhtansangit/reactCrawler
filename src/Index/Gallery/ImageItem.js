import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
            isRedirect: false,
        }
    }
    render() {
        return (
            <div className="img-card">
                <img src={this.props.itemSrc} alt="Img-error" />
                <div className="card__text">
                    <p className="card__title"><button onClick={this.redirect} type="button" className="btn btn-outline-secondary"><i className="fas fa-download" />
                    </button>
                    </p>
                    <p className="card__body">
                    <Link to={{pathname:'/Testing', state:{imgSrc:this.props.itemSrc}}}>
                    <button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button>
                    </Link>
                    </p>
                </div>
            </div>
        );
    }
}
export default ImageItem;
