import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import about from "../../assets/about.png";
import "./contact.scss";
import Newsletter from "../../components/Newsletter/Newsletter";

const BOT_TOKEN = "7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE";
const CHAT_ID = "-1002180292093";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = "Contact Form Submission:%0A";
    text += `Fullname: <b>${formData.fullname}</b>%0A`;
    text += `Email: <b>${formData.email}</b>%0A`;
    text += `Message: <b>${formData.message}</b>`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=html`;

    const api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    setFormData({
      fullname: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <section className="about-section container">
        <div className="about-header">
          <h1>
            We believe in sustainable decor. We’re passionate about life at home.
          </h1>
          <h3>
            Our features timeless furniture, with natural fabrics, curved lines,
            plenty of mirrors and classic design, which can be incorporated into
            any decor project. The pieces enchant for their sobriety, to last
            for generations, faithful to the shapes of each period, with a touch
            of the present.
          </h3>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src={about} alt="About Us" />
          </div>
          <div className="about-info">
            <h2>About Us</h2>
            <h3>
              3elegant is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019. Our customer service is always prepared to support you
              24/7
            </h3>
            <a href="/shop">Shop Now →</a>
          </div>
        </div>
      </section>
      <section className="contact container">
        <h1 className="contact__title">Contact Us</h1>
        <div className="contact__info">
          <div className="contact__card">
            <div className="contact__icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact__details">
              <h2>ADDRESS</h2>
              <p>234 Hai Trieu, Ho Chi Minh City, Viet Nam</p>
            </div>
          </div>
          <div className="contact__card">
            <div className="contact__icon">
              <FaPhoneAlt />
            </div>
            <div className="contact__details">
              <h2>CONTACT US</h2>
              <p>+84 234 567 890</p>
            </div>
          </div>
          <div className="contact__card">
            <div className="contact__icon">
              <FaEnvelope />
            </div>
            <div className="contact__details">
              <h2>EMAIL</h2>
              <p>hello@3elegant.com</p>
            </div>
          </div>
        </div>
        <div className="contact__form-map">
          <div className="contact__form">
            <form onSubmit={handleSubmit}>
              <div className="input__group">
                <label htmlFor="fullname">FULL NAME</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="input__group">
                <label htmlFor="email">MAIL ADDRESS</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="input__group">
                <label htmlFor="message">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="contact__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.509548909896!2d106.7017552744318!3d10.770027989396087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292f08cb6b%3A0x93c6c6f72cc7b0f3!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1690456822875!5m2!1sen!2s"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
      <Newsletter/>
    </div>
  );
};

export default Contact;
