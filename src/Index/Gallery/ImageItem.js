import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Editor from '../../Pages/Editor/Editor';

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc:"",
            isRedirect:false,
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
                    <p className="card__body"><button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button></p>
                </div>
            </div>
        );
    }
}
export default ImageItem;
