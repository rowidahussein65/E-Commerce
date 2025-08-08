import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  // URLs for the logos
  const googlePlayUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
  const appStoreUrl =
    "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg";
  const mastercardUrl =
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg";
  const visaUrl =
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
  const amexUrl =
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/American_Express_logo.svg";
  const paypalUrl =
    "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-section footer-about">
            <h3>About Us</h3>
            <ul>
              <li>
                <a href="#about-us">About FreshCart</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#freshcart-stories">FreshCart Stories</a>
              </li>
              <li>
                <a href="#sustainability">Sustainability</a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-customer-service">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#faq">FAQs</a>
              </li>
              <li>
                <a href="#returns">Returns & Refunds</a>
              </li>
              <li>
                <a href="#shipping">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-social">
            <h3>Social</h3>
            <ul>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-payment">
            <h3>Payment Partners</h3>
            <div className="payment-logos">
              <img src={mastercardUrl} alt="Mastercard" />
              <img src={visaUrl} alt="Visa" />
              <img src={paypalUrl} alt="PayPal" />
              <img src={amexUrl} alt="American Express" />
            </div>
            <h3>Get deliveries with FreshCart</h3>
            <div className="app-badges">
              <a href="#app-store">
                <img src={appStoreUrl} alt="Download on the App Store" />
              </a>
              <a href="#google-play">
                <img src={googlePlayUrl} alt="Get it on Google Play" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p>&copy; 2025 FreshCart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
