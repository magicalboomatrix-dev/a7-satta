import React from 'react'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      
    <section className="topboxnew">
        <div className="container-fluid">
        <div className="col-md-16 nopadding">
            <div className="newnav">
            <ul>
                <li>
                <Link className="" to="/home">
                    Home
                </Link>
                </li>
                <li>
                <Link className="" to="/yearly-chart/satta-king-result">
                    Chart
                </Link>
                </li>
                <li>
                <Link className="" to="/contact">
                    Contact
                </Link>
                </li>
                <li>
                <Link className="" to="/disclaimer">
                    Disclaimer
                </Link>
                </li>
            </ul>
            <div className="clearfix" />
            </div>
            <div className="text_slide">
            <marquee style={{ color: "#fff" }}>
                <p style={{ fontSize: 16, textAlign: "center" }}>
                <b>महत्वपूर्ण सूचना: हम केवल संख्याओं के अनुमान/भविष्यवाणी प्रदान करते हैं। हमारा किसी भी प्रकार के जुआ या सट्टेबाजी से कोई संबंध नहीं है। किसी भी लाभ या हानि के लिए आप स्वयं पूरी तरह से जिम्मेदार होंगे।</b>
                </p>
            </marquee>
            </div>
        </div>
        </div>
    </section>
    <section className="sattalogo">
        <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
            <Link
                title="A7 Satta"
                to="/"
                className="blink"
                style={{ display: "inline", opacity: "0.877126" }}
            >
                <h1 style={{ margin: 0, fontWeight: 700 }}>A7Satta Official</h1>
            </Link>
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Header
