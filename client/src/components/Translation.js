import React from 'react';
import { Badge, Form, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Translation = (props) => {
  const { translation, setTranslations } = props;
  
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
  
  return (
    <div>
      <ListGroup.Item
        key={translation._id}
        action
        variant="warning"
        className="d-flex justify-content-between"
      >
        <div className="d-flex">
          <Form.Check
            type="checkbox"
            label=" "
            checked={translation.translated}
            onClick={() => completeTranslation(translation._id)}
            readOnly
          />
          <Link to={`/${translation._id}`} style={{ textDecoration: 'none' }}>
            {translation.name}
          </Link>
        </div>  
        <Badge>{translation.numberOfPages} pages</Badge>
      </ListGroup.Item>
    </div>
  );
};

export default Translation;
