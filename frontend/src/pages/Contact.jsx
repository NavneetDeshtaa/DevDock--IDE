import React, { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare, Clock, Send } from "lucide-react";
import emailjs from "emailjs-com";
import Navbar from "../components/Navbar";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_zpsbxfj",  
        "template_ghwfskl",  
        formData,
        "8r01TNHoIxyu8rFCI"  
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Failed to send email:", error);
          setSuccessMessage("Failed to send message. Please try again later.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
     <>
      <Navbar />
      <div className="bg-white text-gray-800 py-4 px-6 md:px-20">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 bg-white inline-block px-8 py-3 rounded-lg shadow-md">
            Contact DevDock-IDE
          </h1>
          <p className="text-gray-700 mt-2 text-lg">We're here to help and answer any questions you might have.</p>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-4 text-lg">
              {[
                { icon: <MapPin className="w-5 h-5 text-blue-600" />, title: "Our Location", detail: "Shimla, Himachal Pradesh" },
                { icon: <Mail className="w-5 h-5 text-blue-600" />, title: "Email Us", detail: "support@devdock-ide.com" },
                { icon: <Phone className="w-5 h-5 text-blue-600" />, title: "Call Us", detail: "+91-8894405675" },
                { icon: <Clock className="w-5 h-5 text-blue-600" />, title: "Business Hours", detail: "Monday - Friday: 9:00 AM - 6:00 PM PST" },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
            <h3 className="font-medium text-gray-800 mb-2 text-lg">Connect With Us</h3>
              <div className="flex space-x-3">
                {[Github, Linkedin, Twitter].map((Icon, index) => (
                  <a key={index} href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>

      
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>
            {successMessage && <p className="text-green-600 text-sm mb-4">{successMessage}</p>}
            <form onSubmit={sendEmail} className="space-y-4">
              {[
                { label: "Your Name", type: "text", name: "name" },
                { label: "Email Address", type: "email", name: "email" },
                { label: "Subject", type: "text", name: "subject" },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
