import React from 'react';

function Footer() {
    const links = [
        { name: 'About Us', url: '/about' },
        { name: 'Contact', url: '/contact' },
        { name: 'Privacy Policy', url: '/privacy-policy' },
        { name: 'Terms of Service', url: '/terms' },
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://cdn-icons-png.flaticon.com/128/9360/9360864.png" alt="Logo" />
                </div>
                <ul className="footer-links">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a href={link.url}>{link.name}</a>
                        </li>
                    ))}
                </ul>
                <div className="footer-social">
                    <a href="#" target='_blank' aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" target='_blank' aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" target='_blank' aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
