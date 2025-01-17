import React from 'react';
import styled from 'styled-components';
import reactlogo from './assets/react.png';
//import { Button } from '@mui/material';

const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #00bcd4;
    }
  }

  .logo {
    font-size: 1.5em;
    font-weight: bold;
  }
`;

// Sovellus käyttää Navbar-komponenttia
const Tunniste = () => {
  return (
    <Navbar>
      <img className="sitelogo" src={reactlogo} alt="React-logo" />
      <ul>
        <a href="http://localhost:3000/#/">Koti</a>
        <a href="http://localhost:3000/#/tarina">Tarina</a>
        <a href="http://localhost:3000/#/yhteys">Yhteys</a>
        <a href="http://localhost:3000/#/kartta">Kartta</a>
        <a href="http://localhost:3000/#/video">Video</a>
        <a href='http://localhost:3000/#/cam'>TieKamera</a>
        <a href="http://localhost:3000/#/wiki">WikiSearch</a>
        <a href="http://localhost:3000/#/saa">SääTiedot</a>
      </ul>
    </Navbar>
  );
};

export default Tunniste;
