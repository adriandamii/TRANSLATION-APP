import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Translation = (props) => {
  const { translation } = props;
  return (
    <div>
      <ListGroup.Item>
        <Link to={`/${translation._id}`}>{translation.name}</Link>
      </ListGroup.Item>
    </div>
  );
};

export default Translation;
