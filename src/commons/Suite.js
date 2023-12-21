import React from 'react';
import { Link } from 'react-router-dom';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import './Suite.css';

const Suite = () => {
  return (
    <div className="suites-container">
      <h1>Aplicaciones M.E.M</h1>
      <div className="buttons-row">
        <Link to="/transport/login" className="button orange-button">
          <EmojiTransportationIcon size={50} />
          <p>Transporte</p>
        </Link>
        <Link to="/hemeroteca/login" className="button purple-button">
          <NewspaperIcon size={50} />
          <p>Hemeroteca</p>
        </Link>
      </div>
    </div>
  );
};

export default Suite;
