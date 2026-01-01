import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <>
  <section className="somelinks" style={{ overflow: "hidden" }}>
    
    <Link className="yellow-link mx-4" to="/privacy-policy">
        Privacy Policy
    </Link>
     <Link className="yellow-link mx-4" to="/terms-and-conditions">
        Terms &amp; Conditions
    </Link>    
    
    <br />
  </section>
  <section className="somelinks2">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <strong>©️ 2025 A7 Satta All Rights Reserved</strong>
        </div>
      </div>
    </div>
  </section>
  <section className="somelinks">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <ul>
            <li
              style={{ color: "rgb(255, 216, 0)", padding: 0, fontWeight: 700 }}
            >
              !! DISCLAIMER - A7 Satta is a non-commercial informational
              website. Please view this site at your own risk, All The
              Information Shown On Website Is Sponsored And We Warn You That
              satta matka Gambling/Satta May Be Banned Or Illegal In Your
              Country. We Are Not Responsible For Any Issues Or Scam..., We
              Respect All Country Rules/Laws... If You Not Agree With Our Site
              disclaimer Please Quit Our Site Right Now. Thank You.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

        <div class="support-icon"><a href="https://wa.me/8572063223"><img src="images/support-icon1.png" alt="support icon" /></a></div>
</>

    </div>
  )
}

export default Footer
