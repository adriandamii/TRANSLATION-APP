import React, { useEffect, useState } from 'react';
import { 
  Button,
  Form,
  ListGroup,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTranslation } from '../actions/translations';
import toast from 'react-hot-toast';

const deleteToast = () => toast.success('Successfully deleted!');

const Translation = (props) => {
  const [checkPress, setCheckPress] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [aux, setAux] = useState(false);
  
  const { translation, setTranslations } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let classString = 'fas fa-trash deleteButton';
  
  useEffect(() => {
    if (deleteItem === true) {
      deleteToast();
      dispatch(deleteTranslation(translation._id));
      setDeleteItem(false);
    }
  }, [deleteItem]);
  
  const completeTranslation = async (id) => {
    setCheckPress(true);
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
  
  useEffect(() => {
    if (showDetail === true && showDelete === false && aux === true) {
      setShowDetail(false);
      setAux(false);
    } else if (showDetail === true && showDelete === true) {
      setShowDetail(false);
      setAux(true);
    }
    if (showDetail === true && checkPress === true) {
      setShowDetail(false);
      setCheckPress(false);
    }
  }, [showDetail, showDelete, aux]);
  
  const handleClose = () => {
    setShowDelete(false);
  };
  
  const hclose = () => {
    setShowDetail(false);
  };
  
  const deleteHandler = () => {
    setShowDelete(true);
  };
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Translation status
    </Tooltip>
  );
  
  return (
    <>
      <Modal
        show={showDetail}
        size="sm"
        onHide={hclose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Details{' '}
            <i
              className="fas fa-pen"
              onClick={() => navigate(`/${translation._id}/edit`)}
            ></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
      <ListGroup.Item
        key={translation._id}
        action
        className="list-item"
        variant={translation.translated === true ? 'success' : 'danger'}
        onClick={() => setShowDetail(true)}
      >
        <div className="d-flex">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Form.Check
              type="checkbox"
              label=" "
              checked={translation.translated}
              onClick={() => completeTranslation(translation._id)}
              readOnly
            />
          </OverlayTrigger>
          {translation.name}
        </div> 
        <div>
          <i
            onClick={() => deleteHandler(translation)}
            className={`${classString}`}
          ></i>
        </div>
        <Modal
          show={showDelete}
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
    </>
  );
};

export default Translation;
