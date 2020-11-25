import React, { Component } from 'react';
import {
    Link,
} from "react-router-dom";

import {downloadFromLink} from "../../services/downloadImageByUrl";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

let useStyles;

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
            isRedirect: false,
            openModal: false
        }
    }

        useStyles = makeStyles((theme) => ({
            paper: {
                position: 'absolute',
                width: 400,
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
        }));
    

    render() {
        function getModalStyle() {
            const top = 10;
            const left =10;
            
            return {
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(${top}%, ${left}%)`,
            };
        }
        
        return (
            <div className="img-card" onClick={()=>{this.setState({openModal:true})}}>
                <img src={this.props.itemSrc} alt="Img-error"/>
                <div className="card__text">
                    <p className="card__title"><button onClick={()=>{downloadFromLink(this.props.itemSrc)}} type="button" className="btn btn-outline-secondary"><i className="fas fa-download" />
                    </button>
                    </p>
                    <p className="card__body">
                    <Link to={{pathname:'/Testing', state:{imgSrc:this.props.itemSrc}}}>
                    <button type="button" className="btn btn-outline-secondary"><i className="far fa-edit" /></button>
                    </Link>
                    </p>
                </div>
                <Modal
                    open={this.state.openModal}
                    onClose={()=> this.setState({openModal:false})}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={getModalStyle()} className={useStyles}>
                        <img src={this.props.itemSrc} alt="ItemImage"/>
                    </div>
                    
                </Modal>
            </div>
        );
    }
}
export default ImageItem;
