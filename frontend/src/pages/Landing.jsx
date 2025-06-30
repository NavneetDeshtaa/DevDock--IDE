import { useEffect, useState } from "react";
import { Link, Links } from "react-router-dom";
import {
  Code2,
  Users,
  Lock,
  Download,
  Globe,
  Cpu,
  CheckCircle,
  GitBranch,
  Terminal,
  Sparkles,
  Mail,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Navbar from "../components/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Landing() {
  const [isVisible, setIsVisible] = useState({
    features: false,
    stats: false,
    preview: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const features = document
        .getElementById("features")
        ?.getBoundingClientRect();
      const stats = document.getElementById("stats")?.getBoundingClientRect();
      const preview = document
        .getElementById("preview")
        ?.getBoundingClientRect();

      if (features && features.top < window.innerHeight) {
        setIsVisible((prev) => ({ ...prev, features: true }));
      }
      if (stats && stats.top < window.innerHeight) {
        setIsVisible((prev) => ({ ...prev, stats: true }));
      }
      if (preview && preview.top < window.innerHeight) {
        setIsVisible((prev) => ({ ...prev, preview: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 text-gray-800">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-24 pt-32 pb-20 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold mb-6 gradient-text animate-gradient">
                Code. Create.
                <br />
                Innovate.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 typing-effect">
                Experience a fast, intuitive, and professional code editing platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span> View Projects</span>
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold border-2 border-blue-600 transition-all hover:bg-blue-50 flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Contact Us</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="rounded-xl shadow-2xl"
              >
                {["photo-1461749280684-dccba630e2f6", "photo-1555066931-4365d14bab8c", "photo-1542831371-29b0f74f9713"].map((id, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={`https://images.unsplash.com/${id}`}
                      alt="Code Editor"
                      className="w-full h-auto max-h-[400px] object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Language Banner */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 py-16 px-4 sm:px-8 animate-gradient-slower">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
              Code in Your Favourite Languages
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 mt-2">
              DevDock supports a variety of languages to help you write, run, and debug seamlessly.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 animate-slide-in-slower">
            <Globe className="w-10 h-10 text-blue-600 animate-pulse-glow-slower" />
            {["Python", "JavaScript", "Java", "C++", "Bash", "PHP", "Go"].map((lang) => (
              <span
                key={lang}
                className="text-lg sm:text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-transform hover:scale-110"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-24 py-20 max-w-8xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-blue-800 mb-6 flex justify-center items-center gap-3">
              <CheckCircle className="text-blue-800" size={30} />
              What You Get
            </h2>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible.features ? "animate-fade-in" : "opacity-0"}`}>
            {[
              { icon: Code2, title: "Multi-Language Support", description: "Write and execute code in 7 languages with real-time syntax highlighting." },
              { icon: Lock, title: "Secure Authentication", description: "Enhanced security with OTP-based email verification." },
              { icon: Download, title: "Project Management", description: "Create, save, and download your projects with automated backups." },
              { icon: GitBranch, title: "Version Control", description: "Built-in version control with visual diff viewer and branching." },
              { icon: Cpu, title: "Real-Time Compilation", description: "Instant compilation with optimization tips." },
              { icon: Sparkles, title: "AI Suggestions (SOON..)", description: "Smart code completion and error detection with ML." },
            ].map((feature, index) => (
              <div key={feature.title} className="feature-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                <feature.icon className="w-10 h-10 text-blue-600 mb-6 animate-pulse-glow" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div id="stats" className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 py-20 px-4 sm:px-8 md:px-24 animate-gradient">
          <div className={`container mx-auto ${isVisible.stats ? "animate-scale-up" : "opacity-0"}`}>
            <div className="text-center mb-16">
              <div className="flex justify-center items-center gap-4 mb-6">
                <Users className="w-8 h-8 text-blue-600 animate-pulse-glow" />
                <h2 className="text-4xl sm:text-6xl font-bold gradient-text">Growing Community</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { value: "10+", label: "Active Users" },
                  { value: "35+", label: "Projects Created" },
                  { value: "7", label: "Programming Languages" },
                ].map((stat) => (
                  <div key={stat.label} className="feature-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    <h3 className="text-4xl sm:text-6xl font-bold gradient-text mb-2">{stat.value}</h3>
                    <p className="text-gray-600 text-xl">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div id="preview" className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-24 py-20">
          <div className={isVisible.preview ? "animate-scale-up" : "opacity-0"}>
            <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl min-h-[160px]">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-xs sm:text-sm md:text-base text-gray-300 overflow-x-auto typing-effect">
                <code>{`// Real-time collaboration example
class CodeEditor {
  constructor() {
    this.language = "python";
    this.theme = "monokai";
    this.autoSave = true;
  }

  async compile() {
    try {
      const result = await this.executeCode();
      this.displayOutput(result);
    } catch (error) {
      this.showError(error);
    }
  }
}

const editor = new CodeEditor();
editor.compile();`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 text-center animate-gradient">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Coding Experience?
          </h2>
          <p className="text-sm sm:text-base md:text-xl mb-10 max-w-2xl mx-auto">
            Join our innovative platform and experience the future of collaborative development.
          </p>
          <Link to="/projects">
            <button className="bg-white text-white bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-3 rounded-full font-semibold border-2 border-white hover:scale-105 hover:shadow-xl transition-transform">
              Start Coding Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
