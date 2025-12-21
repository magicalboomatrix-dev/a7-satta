import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import api from "../utils/api"; // import your axios instance

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      // Use Axios api instance
      const { data } = await api.post("/contact", form);

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ fullName: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error sending message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <section className="contact-fsection">
        <div className="container">
          <div className="contact_form">
            <p>
              To book in your free discovery session and audit, call 123 456 7890 or
              send us a message below.
            </p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="rows">
                <div className="rw-in">
                  <label>Full name*</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="rw-in">
                  <label>Email address*</label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="rw-in">
                  <label>Phone number*</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="rowf">
                <div className="col-lf">
                  <label>Message</label>
                  <textarea
                    className="textarea"
                    placeholder="Enter your message"
                    rows={7}
                    cols={75}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="header_btn" disabled={loading}>
                {loading ? "Sending..." : "Send Now"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <br />
      <br />
    </div>
  );
};

export default Contact;
