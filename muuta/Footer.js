import reactlogo from './assets/react.png';
const Footer = () => { 
    return (
            <footer className="footer">
                    <ul>
                        <a href="http://localhost:3000/#/">Koti</a>
                        <a href="http://localhost:3000/#/tarina">Tarina</a>
                        <a href="http://localhost:3000/#/yhteys">Yhteys</a>
                        <a href="http://localhost:3000/#/kartta">Kartta</a>
                        <a href="http://localhost:3000/#/video">Video</a>
                        <a href='http://localhost:3000/#/cam'>TieKamera</a>
                    </ul>
                <p>React Router-websivusto &copy; 2025 <a src="http://localhost:3000/lomake">lomake</a></p>
                <img className="sitelogo" src={reactlogo} alt="React-logo" />
            </footer>
    );
}

export default Footer;
