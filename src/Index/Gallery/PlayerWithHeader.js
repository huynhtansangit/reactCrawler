import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import axios from 'axios';


class PlayerWithHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: ""
        }
    }

    async componentWillMount(){
        const option = {
            method: 'GET',
            headers: {
                "Referer": "https://www.tiktok.com/",
                "Accept-Language": "vi,en;q=0.9",
                "Cookie": "tt_webid=6898558652739800321; tt_webid_v2=6898558652739800321;",
                "Range": "bytes=0-"
            }
        };
        try{
            console.log("here");
            const result = await fetch(this.props.url, option);
            const blob = await result.blob();
            if(blob){
                await this.setState({ fileName: URL.createObjectURL(blob), playing: true});
            }
        }catch(err){ 
            console.log(err);
        }

        // var xhr = new XMLHttpRequest();
        // var json_obj, status = false;
        // xhr.open("GET", this.props.url, true);
        // xhr.setRequestHeader("Referer", "https://www.tiktok.com/");
        // xhr.setRequestHeader("Accept-Language", "vi,en;q=0.9");
        // xhr.setRequestHeader("Cookie", "tt_webid=6898558652739800321; tt_webid_v2=6898558652739800321;",);
        // xhr.setRequestHeader("Range", "bytes=0-");
        // xhr.onload = function (e) {
        // if (xhr.readyState === 4) {
        //     if (xhr.status === 200) {
        //     var json_obj = JSON.parse(xhr.responseText);
        //     status = true;
        //     this.setState({ json_obj });
        //     } else {
        //     console.error(xhr.statusText);
        //     }
        // }
        // }.bind(this);
        // xhr.onerror = function (e) {
        // console.error(xhr.statusText);
        // };
        // xhr.send(null);
    }

    render() {
        return(<>
            <ReactPlayer url={this.state.filename} key={this.props.key} controls={true} width={'60rem'} height={'30rem'} />
        </>)
    }
}

export default PlayerWithHeader;
