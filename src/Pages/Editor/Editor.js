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
                                <h5 className="edit-pic-main-option-title mb-0">Filter</h5>
                            </div>
                            <div id="edit-pic-color-main-option" className="edit-pic-main-option">
                                <i class="fas fa-tint fa-light navigator-icon-menu"></i>
                                <h5 className="edit-pic-main-option-title mb-0">Effect</h5>
                            </div>
                            <div id="edit-pic-img-main-option" className="edit-pic-main-option">
                                <i className="fas fa-file-image fa-light navigator-icon-menu" />
                                <h5 className="edit-pic-main-option-title mb-0">Image</h5>
                            </div>
                        </div>
                        <div id="edit-pic-detail-main-option-container" className="col-3 border-right">
                            {/* Filter option */}
                            <div id="edit-pic-text-option" className="edit-pic-option">
                                <div className="mt-2">
                                    <label>Url</label>
                                    <form id="form-url-editor">
                                        <input type="text" id="link-input" placeholder="Image url" />
                                        <button id="change-image" type="button" className="btn btn-dark" >Submit</button>
                                    </form>
                                </div>
                                <div className="mt-2 d-block">
                                    <div  class=" btn-group btn-group-sm w-100 mt-4">
                                        <button class="filter-btn brightness-remove btn btn-info">-</button>
                                        <button class="btn btn-secondary btn-disabled" disabled>Brightness
                                            <p class="bright-value mb-0">0</p>
                                        </button>
                                        <button class="filter-btn brightness-add btn btn-info">+</button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                <div  class=" btn-group btn-group-sm w-100 mt-4">
                                        <button class="filter-btn contrast-remove btn btn-info">-</button>
                                        <button class="btn btn-secondary btn-disabled" disabled>Contrast
                                            <p class="contrast-value mb-0">0</p>

                                        </button>
                                        <button class="filter-btn contrast-add btn btn-info">+</button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                <div  class=" btn-group btn-group-sm w-100 mt-4">
                                        <button class="filter-btn saturation-remove btn btn-info">-</button>
                                        <button class="btn btn-secondary btn-disabled" disabled>Saturation
                                            <p class="saturation-value mb-0">0</p>

                                        </button>
                                        <button class="filter-btn saturation-add btn btn-info">+</button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                <div  class=" btn-group btn-group-sm w-100 mt-4">
                                        <button class="filter-btn vibrance-remove btn btn-info">-</button>
                                        <button class="btn btn-secondary btn-disabled" disabled>Vibrance
                                            <p class="vibrance-value mb-0">0</p>

                                        </button>
                                        <button class="filter-btn vibrance-add btn btn-info">+</button>
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
                        <div id="preview-editing-pic" className="image-container col-8 p-3">
                            {/* <img id="foto-image" className="w-100 mt-4 h-100 image" /> */}
                            <canvas id="canvas" className="image w-100 mt-4"></canvas>
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
