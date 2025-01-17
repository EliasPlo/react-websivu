import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

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

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: darken(${(props) => props.theme.colors.secondary}, 10%);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: ${(props) => props.theme.spacing.small};
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

// Sivukomponentit
const Home = () => <div><h2>Koti</h2><p>Tervetuloa kotisivulle!</p></div>;
const Products = () => <div><h2>Tuotteet</h2><p>Tutustu tuotteisiimme!</p></div>;
const Contact = () => <div><h2>Yhteystiedot</h2><p>Ota meihin yhteyttä! <Button> Ota Yhteyttä</Button></p></div>;

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
        </NavBar>
        {renderPage()}
        <Footer>© 2025 React App</Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
