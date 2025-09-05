import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
  <>
  <footer className="footer">
      <div className="footer-logo">Textto</div>
      <div className="footer-grid">
        <div>
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Press & Media</a>
          <a href="#">Customers</a>
          <a href="#">Contact</a>
        </div>
        <div>
          <h4>Docs</h4>
          <a href="#">API</a>
          <a href="#">Help Document</a>
          <a href="#">Forum</a>
        </div>
        <div>
          <h4>Follow us</h4>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Medium</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="legal">
          Privacy | Security | Cookies | Terms | DLT
        </p>
        {/* <p>© 2022 Gupshup. All rights reserved.</p> */}
      </div>
    </footer>
  </>
  )
}

export default Footer