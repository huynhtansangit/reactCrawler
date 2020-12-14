/*eslint no-use-before-define: ["error", { "variables": false }]*/
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import './ImageHover.css'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { downloadImageByUrl } from "../../services/user.services";
import { Button, Modal } from 'react-bootstrap';
import {Link,} from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 800,
    overflowY: 'scroll',
    marginTop: 20,
  },
});

export default function MasonryImageList(props) {
  const classes = useStyles();
  const [isShowModal, setShowModal] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("");
  // const [temp, setTemp] = React.useState("");

  function handleShow(source) {
    setShowModal(!isShowModal);
    setImgSrc(source);
  }

  useEffect(() => {
      // setTemp(props.data[0]);
  });

  return (
    <div className={classes.root}>
      {/* {temp} */}
      <ImageList variant="masonry" cols={6} gap={10}>
        {props.data.map((item) => (
          <ImageListItem key={item.url}>
            <img
              srcSet={`${item.url}`}
              alt={item.title}
              // Hai dòng dưới thêm vào url sẽ lỗi, tìm cách format thủ công cho nó.
              // ?w=280&fit=crop&auto=format 1x,
                // ${item.url}?w=280&fit=crop&auto=format&dpr=2 2x
            />
            <div className="card__text">
              <p className="card__title"><button onClick={() => handleShow(item.url)} type="button" className="btn btn-outline-secondary"><VisibilityOutlinedIcon/></button></p>
              <p className="card__title"><button onClick={() => { downloadImageByUrl(item.url) }} type="button" className="btn btn-outline-secondary"><GetAppOutlinedIcon /></button></p>
              <p className="card__body">
                <Link to={{ pathname: '/editor', state: { imgSrc: item.url } }}>
                  <button type="button" className="btn btn-outline-secondary"><EditOutlinedIcon /></button>
                </Link>
              </p>
            </div>
          </ImageListItem>
        ))}
        <Modal
          size="xl"
          scrollable={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isShowModal}
          onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Image previewer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img className='img-fluid' width={1100} height={1000} style={{ objectFit: 'cover' }} src={imgSrc} alt="Img-error" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Link to={{ pathname: '/editor', state: { imgSrc: imgSrc } }}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button variant="secondary" onClick={() => { downloadImageByUrl(imgSrc) }}>Download</Button>
          </Modal.Footer>
        </Modal>
      </ImageList>
    </div>
  );
}