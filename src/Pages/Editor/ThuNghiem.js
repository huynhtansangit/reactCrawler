import React, { Component } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
// import FileSaver from 'file-saver'
import '../../App.css';
import logo from './logo_transparent.png';
var whiteTheme = {
    'common.bi.image': logo,
    'common.bisize.width': '151px',
    'common.bisize.height': '51px',
    'common.backgroundImage': './img/bg.png',
    'common.backgroundColor': '#fff',
    'common.border': '1px solid #c1c1c1',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': '\'Noto Sans\', sans-serif',
    'loadButton.fontSize': '16px',

    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': '\'Noto Sans\', sans-serif',
    'downloadButton.fontSize': '16px',

    // main icons
    'menu.normalIcon.color': '#8a8a8a',
    'menu.activeIcon.color': '#555555',
    'menu.disabledIcon.color': '#434343',
    'menu.hoverIcon.color': '#e9e9e9',
    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',

    // submenu icons
    'submenu.normalIcon.color': '#8a8a8a',
    'submenu.activeIcon.color': '#555555',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',

    // submenu primary color
    'submenu.backgroundColor': 'transparent',
    'submenu.partition.color': '#e5e5e5',

    // submenu labels
    'submenu.normalLabel.color': '#858585',
    'submenu.normalLabel.fontWeight': 'normal',
    'submenu.activeLabel.color': '#000',
    'submenu.activeLabel.fontWeight': 'normal',

    // checkbox style
    'checkbox.border': '1px solid #ccc',
    'checkbox.backgroundColor': '#fff',

    // rango style
    'range.pointer.color': '#333',
    'range.bar.color': '#ccc',
    'range.subbar.color': '#606060',

    'range.disabledPointer.color': '#d3d3d3',
    'range.disabledBar.color': 'rgba(85,85,85,0.06)',
    'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',

    'range.value.color': '#000',
    'range.value.fontWeight': 'normal',
    'range.value.fontSize': '16spx',
    'range.value.border': '0',
    'range.value.backgroundColor': '#f5f5f5',
    'range.title.color': '#000',
    'range.title.fontWeight': 'lighter',

    // colorpicker style
    'colorpicker.button.border': '0px',
    'colorpicker.title.color': '#000'
};
class ThuNghiem extends Component {
    // constructor(props) {
    //     super(props);

    // }
    editorRef = React.createRef();

    handleClickButton = () => {
        const editorInstance = this.editorRef.current.getInstance();

        editorInstance.flipX();
    };


    render() {
        return (
            <>
            <div className="editor-container">
            <ImageEditor
                    includeUI={{
                        loadImage: {
                            path: this.props.location.state.imgSrc,
                            name: 'Instagram image editor'
                        },
                        menu: ['shape', 'filter','text','icon','crop'],
                        initMenu: 'filter',
                        uiSize: {
                            width: '100%',
                            height: '100vh'
                        },
                        menuBarPosition: 'top',
                        theme:whiteTheme
                    }}
                    cssMaxHeight={800}
                    cssMaxWidth={800}
                    selectionStyle={{
                        cornerSize: 20,
                        rotatingPointOffset: 70
                    }}
                    usageStatistics={false}

                />
            </div>
            </>
        );
    }
}

export default ThuNghiem;
