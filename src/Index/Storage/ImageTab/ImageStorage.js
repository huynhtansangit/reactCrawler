/*eslint no-use-before-define: ["error", { "variables": false }]*/
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import './ImageHover.css'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { downloadImageByUrl } from "../../../services/user.services";
import { Button, Modal } from 'react-bootstrap';
import { Link, } from "react-router-dom";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import { removeItemFromCollection } from '../../../services/user.services'
// import Skeleton from '@material-ui/lab/Skeleton';


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
  const [mediaDTO, setMediaDTO] = React.useState("");
  const [data, setData] = React.useState([]);


  function handleShow(source, dto) {
    // Set image url whenever modal is showed, not when it closed.
    if (!isShowModal) {
      setImgSrc(source);
      setMediaDTO(dto);
    }
    setShowModal(!isShowModal);
  }

  const clickUnFavorite = async (collectionId, itemId) => {
    if (window.confirm("Are you sure want to remove this item from collection?")) {
      await removeItemFromCollection(collectionId, itemId);
      await setShowModal(false);
      const newListData = data.filter((item) => item.id !== itemId);
      setData(newListData);
    }
  }

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className={classes.root}>
      <ImageList variant="masonry" cols={6} gap={2} rowHeight={264}>
        {data.map((item) => (
          <ImageListItem key={item.url}>
            <img
              srcSet={item.url}
              alt={item.title}
            />
            <div className="card__text">
              <p className="card__title"><button onClick={() => handleShow(item.url, { id: item.id, collectionId: item.collection_id })} type="button" className="btn btn-outline-secondary"><VisibilityOutlinedIcon /></button></p>
              <p className="card__title"><button onClick={() => { downloadImageByUrl(item.url) }} type="button" className="btn btn-outline-secondary"><GetAppOutlinedIcon /></button></p>
              <p className="card__title">
                <Link to={{ pathname: '/editor', state: { imgSrc: item.url } }}>
                  <button type="button" className="btn btn-outline-secondary"><EditOutlinedIcon /></button>
                </Link>
              </p>
              <p className="card__title">
                <button onClick={() => {
                  clickUnFavorite(item.collection_id, item.id);
                }}
                  type="button" className={`btn btn-outline-secondary selectedBtn`}>
                  <FavoriteTwoToneIcon />
                </button>
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
            <Button variant="secondary" onClick={() => { clickUnFavorite(mediaDTO.collectionId, mediaDTO.id) }}>Remove this from collection</Button>
          </Modal.Footer>
        </Modal>
      </ImageList>
    </div>
  );
}