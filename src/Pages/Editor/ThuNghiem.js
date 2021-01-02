import React, { Component } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
// import FileSaver from 'file-saver'
import '../../App.css';
import './Editor.css';
// import logo from './logo_transparent.png';
var customTheme = {
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': '#fff',
    'common.border': '0px',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': 'NotoSans, sans-serif',
    'loadButton.fontSize': '12px',

    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': 'NotoSans, sans-serif',
    'downloadButton.fontSize': '12px',

    // icons default
    'menu.normalIcon.color': '#8a8a8a',
    'menu.activeIcon.color': '#555555',
    'menu.disabledIcon.color': '#434343',
    'menu.hoverIcon.color': '#e9e9e9',
    'submenu.normalIcon.color': '#8a8a8a',
    'submenu.activeIcon.color': '#e9e9e9',

    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',

    // submenu primary color
    'submenu.backgroundColor': '#1e1e1e',
    'submenu.partition.color': '#858585',

    // submenu labels
    'submenu.normalLabel.color': '#858585',
    'submenu.normalLabel.fontWeight': 'lighter',
    'submenu.activeLabel.color': '#fff',
    'submenu.activeLabel.fontWeight': 'lighter',

    // checkbox style
    'checkbox.border': '1px solid #ccc',
    'checkbox.backgroundColor': '#fff',

    // rango style
    'range.pointer.color': '#fff',
    'range.bar.color': '#666',
    'range.subbar.color': '#d1d1d1',

    'range.disabledPointer.color': '#414141',
    'range.disabledBar.color': '#282828',
    'range.disabledSubbar.color': '#414141',

    'range.value.color': '#fff',
    'range.value.fontWeight': 'lighter',
    'range.value.fontSize': '11px',
    'range.value.border': '1px solid #353535',
    'range.value.backgroundColor': '#151515',
    'range.title.color': '#fff',
    'range.title.fontWeight': 'lighter',

    // colorpicker style
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
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
                            menu: ['shape', 'filter', 'text', 'icon', 'crop'],
                            initMenu: 'filter',
                            uiSize: {
                                width: '100%',
                                height: '100vh'
                            },
                            menuBarPosition: 'left',
                            theme:customTheme
                        }}
                        cssMaxHeight={800}
                        cssMaxWidth={500}
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
