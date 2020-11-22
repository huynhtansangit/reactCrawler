import React, { Component } from 'react';
import Header from '../../Index/Header/Header';

class Editor extends Component {
    render() {
        return (
            <div>
                <section className="mt-4 " id="edit-pic-section">
                    <div className="edit-pic-container row">
                        <div id="edit-pic-main-option-container" className="col-1 p-0 m-0 text-center">
                            <div id="edit-pic-text-main-option" className="edit-pic-main-option selected-edit-pic-main-option">
                                <i className="fas fa-adjust fa-light navigator-icon-menu"></i>
                                <h5 className="edit-pic-main-option-title mb-0">Text</h5>
                            </div>
                            <div id="edit-pic-color-main-option" className="edit-pic-main-option">
                                <i className="fas fa-palette fa-light navigator-icon-menu" />
                                <h5 className="edit-pic-main-option-title mb-0">Color</h5>
                            </div>
                            <div id="edit-pic-img-main-option" className="edit-pic-main-option">
                                <i className="fas fa-file-image fa-light navigator-icon-menu" />
                                <h5 className="edit-pic-main-option-title mb-0">Image</h5>
                            </div>
                        </div>
                        <div id="edit-pic-detail-main-option-container" className="col-3">
                            {/* Filter option */}
                            <div id="edit-pic-text-option" className="edit-pic-option">
                                <div className="mt-2">
                                    <label>Grayscale</label>
                                    <input id="input-adjust-pic-grayscale" className="form-control adjust-bar p-0" type="range"   min={-100} max={100} defaultValue={0} />
                                    <div className="row">
                                        <p className="col-4 text-left">-100</p>
                                        <p className="col-4 text-center">0</p>
                                        <p className="col-4 text-right">100</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Blur</label>
                                    <input id="input-adjust-pic-blur" className="form-control adjust-bar p-0" type="range"   min={-100} max={100} defaultValue={0}/>
                                    <div className="row">
                                        <p className="col-4 text-left">-100</p>
                                        <p className="col-4 text-center">0</p>
                                        <p className="col-4 text-right">100</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Hue-rotate</label>
                                    <input id="input-adjust-hue-rotate" className="form-control adjust-bar p-0" type="range"  min={-100} max={100} defaultValue={0} />
                                    <div className="row">
                                        <p className="col-6 text-left">-100</p>
                                        <p className="col-6 text-right">100</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Sepia</label>
                                    <input id="input-adjust-sepia" className="form-control adjust-bar p-0" type="range"   min={-100} max={100} defaultValue={0} />
                                    <div className="row">
                                        <p className="col-6 text-left">-100</p>
                                        <p className="col-6 text-right">100</p>
                                    </div>
                                </div>
                            </div>
                            <div id="edit-pic-color-option" className="edit-pic-option">
                                <div className="mt-2">
                                    <label>Picture width</label>
                                    <input id="input-adjust-pic-width" className="form-control adjust-bar p-0" type="range" min={-360} max={360} defaultValue={0} />
                                    <div className="row">
                                        <p className="col-4 text-left">-360</p>
                                        <p className="col-4 text-center">0</p>
                                        <p className="col-4 text-right">360</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Logo height</label>
                                    <input id="input-adjust-pic-height" className="form-control adjust-bar p-0" type="range" min={-360} max={360} defaultValue={0} />
                                    <div className="row">
                                        <p className="col-4 text-left">-360</p>
                                        <p className="col-4 text-center">0</p>
                                        <p className="col-4 text-right">360</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Opacity</label>
                                    <input id="input-adjust-pic-opacity" className="form-control adjust-bar p-0" type="range" min={1} max={100} defaultValue={50} />
                                    <div className="row">
                                        <p className="col-6 text-left">0</p>
                                        <p className="col-6 text-right">100</p>
                                    </div>
                                </div>
                            </div>
                            <div id="edit-pic-image-option" className="edit-pic-option">
                                Updating...
                </div>
                        </div>
                        <div id="preview-editing-pic" className="col-8 p-3">
                            <img id="pic-preview" className="w-100 h-100" src="/Assets/Images/EditPicture/preview-img.png" alt="preview picture" />
                        </div>
                    </div>
                    <div id="btn-export-container" className="text-center">
                        <button id="btn-export" className="btn-export rounded">Export</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Editor;
