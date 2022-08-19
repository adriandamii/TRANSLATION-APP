import React, { useEffect, useState } from 'react';
import { 
  Button,
  Form,
  ListGroup,
  Modal,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTranslation } from '../actions/translations';
import toast from 'react-hot-toast';

const deleteToast = () => toast.success('Successfully deleted!');

const Translation = (props) => {
  const [deleteItem, setDeleteItem] = useState(false);
  const [show, setShow] = useState(false);
  const [detailButton, setDetailButton] = useState(false);
  const { translation, setTranslations } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleClose = () => {
    setShow(false);
  };
  
  useEffect(() => {
    if (deleteItem === true) {
      deleteToast();
      dispatch(deleteTranslation(translation._id));
      setDeleteItem(false);
    }
  }, [deleteItem]);
  
  const completeTranslation = async (id) => {
    const data = await fetch(
      `http://localhost:5000/translations/complete/${id}`
    ).then((res) => res.json());
    
    setTranslations((translations) =>
      translations.map((tr) => {
        if (tr._id === data._id) {
          tr.translated = data.translated;
        }
        return tr;
      })
    );
  };
  
  const deleteHandler = () => {
    setShow(true);
  };
  
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="pop">
        Details
        <Button
          className="edit-button"
          size="sm"
          variant="secondary"
          onClick={() => navigate(`/${translation._id}/edit`)}
        >
          <i className="fas fa-pen"></i>
        </Button>
      </Popover.Header>
      <Popover.Body>
        <strong>Name:</strong> {translation.name}
        <br></br>
        <strong>Office:</strong> {translation.office}
        <br></br>
        <strong>Pages:</strong> {translation.numberOfPages}
        <br></br>
        <strong>Price Page:</strong> {translation.pagePrice}
        <br></br>
        <strong>Created:</strong> {translation.date}
        <br></br>
      </Popover.Body>
    </Popover>
  );
  
  return (
    <ListGroup.Item
      key={translation._id}
      action
      className="list-item"
      variant={translation.translated === true ? 'success' : 'danger'}
    >
      <div className="d-flex">
        <Form.Check
          type="checkbox"
          label=" "
          checked={translation.translated}
          onClick={() => completeTranslation(translation._id)}
          readOnly
        />
        {translation.name}
      </div>
      <div>
        <Button
          size="sm"
          variant="danger"
          type="button"
          className="deleteButton"
          onClick={() => deleteHandler(translation)}
        >
          <i className="fas fa-trash"></i>
        </Button>{' '}
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button
            size="sm"
            type="button"
            className="detail-button"
            variant="success"
            onClick={() => setDetailButton(!detailButton)}
          >
            {detailButton ? 'Hide details' : 'See details'}
          </Button>
        </OverlayTrigger>
      </div> 
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{translation.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setDeleteItem(true)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </ListGroup.Item>
  );
};

export default Translation;
