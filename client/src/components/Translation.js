import React from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Translation = (props) => {
  const { translation } = props;
  return (
    <div>
      <Link to={`/${translation._id}`}>
        <ListGroup.Item action variant="warning" className="d-flex justify-content-between align-items-start">
        {translation.name}
        <Badge>
          {translation.numberOfPages} pages
        </Badge>
        </ListGroup.Item>
      </Link>
    </div>
  );
};

export default Translation;
