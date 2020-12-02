import React, { Component } from 'react';

class OwnerMedia extends Component {
    constructor(props) {
        super(props);
        this.state={
            avatar: "",
            username: "",
            fullname: "",
            countPost: "",
            countFollowedBy: 0,
        }
    }
    render() {
        return (
            <div>
                <div className="avt-container">
                    <img style={{"borderRadius": "50%"}} width={160} height={160} src={this.props.avatar} alt="avatar" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                <i style={{ paddingRight: '15px' }} className={`fab fa-${this.props.nameNetwork}`}  />{this.props.username}</div>
                <p style={{ fontSize: '26px', paddingTop: '49px', fontWeight: 'bold' }}>Available items</p>
                <div className="number-of-images-available" style={{ fontWeight: 'bold', paddingTop: '43px', color: '#154B61', fontSize: '35px' }}>
                    {this.props.countPost}
                </div>
            </div>
        );
    }
}
export default OwnerMedia;