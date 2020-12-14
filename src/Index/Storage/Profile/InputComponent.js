import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const convertTimeStampToDate = (timestamp) => {
    return new Date(timestamp);
}
class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        }
    }
    edit = () => { this.setState({ isEdit: true }) }
    save = () => { this.setState({ isEdit: false }) }

    renderEdit = (type) => {
        if (type === "text") {
            return (<div>
                {
                    <input className="w-75 form-control" type="text" name={this.props.name} id={this.props.id} onChange={this.updateInputProfile} value={this.props.firstname} />
                }

                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={this.save}>Save</Button>
                </ButtonGroup>
            </div>)
        }
        else if (type === "date") {
            return (<div>
                {
                    <input className="w-75 form-control" type="date" name="birthday" id="birthday" onChange={this.updateInputProfile} value={() => { convertTimeStampToDate(this.props.birthday) }} />
                }
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={this.save}>Save</Button>
                </ButtonGroup>
            </div>)
        }
        else if (type === "file") {
            return (<div>
                {
                    <div>
                    <input className="w-75 form-control"  type="file" id={this.props.id} />    
                    </div>
                }
                <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button onClick={this.save}>Save</Button>
                        </ButtonGroup>
            </div>)
        }
    }


    renderLabel = () => (
                <div>
                    <p style={{ marginLeft: '0px', cursor: 'pointer' }}>Huynh Tan Sang</p>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button onClick={this.edit} Variant="contained" color="secondary">Edit</Button>
                    </ButtonGroup>
                </div>
    )
    handelRendering = (type) => {
        if (this.state.isEdit === false) {
            return this.renderLabel();
        }
        else return this.renderEdit(type);
    }
    render() {
        return (
                <div className="mt-2 w-75 ">
                    <label style={{ fontSize: '20px' }} htmlFor={this.props.htmlFor}>{this.props.title} :</label>
                    {this.handelRendering(this.props.type)}
                </div>
        );
    }
}

export default InputComponent;
