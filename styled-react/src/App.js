// App.js
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './components/Home';
import Products from './components/Products';
import Contact from './components/Contact';
import FormComponent from './components/FormComponent';

// Oletus teema
const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#FF5722',
    background: '#F5F5F5',
    text: '#333333',
  },
  fonts: {
    main: 'Arial, sans-serif',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

// Tyyli komponentit
const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.main};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.medium};

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.small};
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.medium};
  width: 100%;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavBar = styled.nav`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  padding: ${(props) => props.theme.spacing.small};
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.large};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.small};
    align-items: center;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing.small};
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Pääkomponentti
function App() {
  const [activePage, setActivePage] = useState('home'); // Tila aktiiviselle sivulle

  // Renderöi oikea sivu tilan perusteella
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products />;
      case 'contact':
        return <Contact />;
      case 'form':
        return <FormComponent />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header>Tervetuloa Teemalliseen sivustoon</Header>
        <NavBar>
          <NavLink onClick={() => setActivePage('home')}>Koti</NavLink>
          <NavLink onClick={() => setActivePage('products')}>Tuotteet</NavLink>
          <NavLink onClick={() => setActivePage('contact')}>Yhteystiedot</NavLink>
          <NavLink onClick={() => setActivePage('form')}>Lomake</NavLink>
        </NavBar>
        {renderPage()}
        <Footer>© 2025 React App</Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
