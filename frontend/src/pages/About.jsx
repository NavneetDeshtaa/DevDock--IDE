import React from "react";
import { Code, Rocket, Layers, Settings } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-white text-gray-800 py-10 px-6 md:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600">About DevDock IDE</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            DevDock IDE is a powerful web-based development environment designed to streamline coding, debugging, and collaboration for developers.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Code size={40} className="text-blue-500" />}
            title="Lightning-Fast Coding"
            description="Write, edit, and manage code with a fast, intuitive, and distraction-free interface."
          />
          <FeatureCard
            icon={<Rocket size={40} className="text-green-500" />}
            title="AI-Powered Assistance"
            description="Smart code suggestions and debugging insights to boost productivity."
          />
          <FeatureCard
            icon={<Layers size={40} className="text-purple-500" />}
            title="Multi-Language Support"
            description="Supports multiple programming languages, including JavaScript, Python, C++, and more."
          />
          <FeatureCard
            icon={<Settings size={40} className="text-orange-500" />}
            title="Customization & Themes"
            description="Personalize your workspace with themes, keybindings, and layouts."
          />
          <FeatureCard
            icon={<Code size={40} className="text-red-500" />}
            title="Live Collaboration"
            description="Work together in real-time with teammates using built-in sharing features."
          />
          <FeatureCard
            icon={<Rocket size={40} className="text-indigo-500" />}
            title="Cloud Integration"
            description="Seamlessly integrate with cloud services like GitHub, Firebase, and more."
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all">
            Get Started with Your Project.
          </Link>
        </div>
      </section>
    </>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center border border-gray-200">
      <div className="flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold mt-3 text-gray-800">{title}</h4>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default About;
