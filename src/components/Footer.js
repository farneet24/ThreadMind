import React, { useState, useEffect } from "react";

function Footer(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let imageHeight = 175;  // Default height

  if (windowWidth <= 1200) {
    imageHeight = 160;
  } 
  if (windowWidth <= 992) {
    imageHeight = 150;
  }
  if (windowWidth <= 768) {
    imageHeight = 135;
  }
  if (windowWidth <= 576) {
    imageHeight = 120;
  }

  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row-footer">
            <div className="footer-col">
              <img
                src="https://ik.imagekit.io/bje8xuiyf/android-chrome-512x512.png?updatedAt=1693425984737"
                height={imageHeight}
                alt="ThreadMind Logo"
                title="ThreadMind"
              />
            </div>
            <div className="footer-col">
              <h4><i className="fas fa-brain"></i> Machine Learning Projects</h4>
              <ul className="lesspad">
                <li><a href="#"><i className="fas fa-comment-dots"></i> ThreadMind</a></li>
                <li><a href="https://farneet24-sms-spam-app-r53bi4.streamlit.app/" target="_blank"><i className="fas fa-envelope"></i> SMS/Email Spam Analyzer</a></li>
                <li><a href="https://farneet24-chatanalyzer-app-pi7gil.streamlit.app/" target="_blank"><i className="fas fa-mobile-alt"></i> WhatsApp Chat Analyzer</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4><i className="fas fa-laptop-code"></i> Web Development Projects</h4>
              <ul className="lesspad">
                <li><a href="https://news-daily-swart.vercel.app/" target="_blank"><i className="fas fa-newspaper"></i> NewsDaily</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4><i className="fas fa-share-alt"></i> Get in Touch</h4>
              <div className="social-links">
                <a href="mailto:farneetsingh_co21a3_72@dtu.ac.in"><i class="fa-solid fa-envelope"></i></a>
                <a href="https://github.com/farneet24" target="_blank"><i className="fab fa-github"></i></a>
                <a href="https://www.instagram.com/farneet.singh/" target="_blank"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/farneet-singh-6b155b208/" target="_blank"><i className="fab fa-linkedin-in" ></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
