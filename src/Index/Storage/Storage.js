import React, { Component } from 'react';
import TabMenu from './TabMenu';
import './Storage.css';
class Storage extends Component {
    render() {
        return (
            <section id="storage-section">
                <div className="storage-container">
                    <img id="you-can-find-downloaded-stuff-here" src="Assets/Images/Store/Mask-Group-2-Copy.png" alt="All downloaded here" />
                    <TabMenu/>
                </div>
            </section>
        );
    }
}

export default Storage;
