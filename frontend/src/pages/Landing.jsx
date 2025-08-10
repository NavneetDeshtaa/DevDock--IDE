import { Link } from "react-router-dom";
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
  Star,
  Play,
  Github,
  Zap,
  TrendingUp,
  Rocket,
  Smartphone,
} from "lucide-react";
import Navbar from "../components/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Landing() {

  const stats = [
    {
      label: "Active Developers",
      value: "50+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Projects Created",
      value: "200+",
      icon: <Code2 className="w-6 h-6" />,
    },
    {
      label: "Lines of Code",
      value: "10.9k+",
      icon: <Terminal className="w-6 h-6" />,
    },
    { label: "Countries", value: "190+", icon: <Globe className="w-6 h-6" /> },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 text-gray-800">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                    <Star className="w-4 h-4 mr-2" />
                    Trusted by 100+ developers
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                    Code Anytime,
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      {" "}
                      Anywhere
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    The most powerful cloud-based IDE for modern development.
                    Code, collaborate, and deploy from anywhere with our
                    lightning-fast, secure platform.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/projects"
                    className="group bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-block"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Start Coding Now</span>
                    </div>
                  </Link>

                  <a
                    href="https://github.com/NavneetDeshtaa/DevDock--IDE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:border-indigo-300 hover:text-indigo-600 transition-all inline-block"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Github className="w-5 h-5" />
                      <span>View on GitHub</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>5x Faster</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1">
                  <div className="bg-slate-900 rounded-xl overflow-hidden">
                    <div className="flex items-center space-x-2 px-4 py-3 bg-slate-800">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="flex-1 text-center">
                        <span className="text-slate-400 text-sm">
                          CodeIDE - main.tsx
                        </span>
                      </div>
                    </div>
                    <div className="p-6 font-mono text-sm">
                      <div className="space-y-2">
                        <div className="text-purple-400">
                          import <span className="text-blue-400">React</span>{" "}
                          from <span className="text-green-400">'react'</span>;
                        </div>
                        <div className="text-purple-400">
                          import{" "}
                          <span className="text-blue-400">
                            &lbrace; useState &rbrace;
                          </span>{" "}
                          from <span className="text-green-400">'react'</span>;
                        </div>
                        <div className="text-slate-500">
                          // AI-powered suggestions
                        </div>
                        <div className="text-blue-400">
                          function <span className="text-yellow-400">App</span>
                          () &lbrace;
                        </div>
                        <div className="ml-4 text-purple-400">
                          const [<span className="text-blue-400">count</span>,{" "}
                          <span className="text-blue-400">setCount</span>] ={" "}
                          <span className="text-yellow-400">useState</span>(
                          <span className="text-orange-400">0</span>);
                        </div>
                        <div className="ml-4 text-purple-400">return (</div>
                        <div className="ml-8 text-green-400">
                          &lt;div className=
                          <span className="text-green-400">"app"</span>&gt;
                        </div>
                        <div className="ml-12 text-green-400">
                          &lt;h1&gt;Hello CodeIDE!&lt;/h1&gt;
                        </div>
                        <div className="ml-8 text-green-400">&lt;/div&gt;</div>
                        <div className="ml-4 text-purple-400">);</div>
                        <div className="text-blue-400">&rbrace;</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-600">
                      Live collaboration soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Language Banner */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 py-16 px-4 sm:px-8 animate-gradient-slower">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
              Code in Your Favourite Languages
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 mt-2">
              DevDock supports a variety of languages to help you write, run,
              and debug seamlessly.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 animate-slide-in-slower">
            <Globe className="w-10 h-10 text-blue-600 animate-pulse-glow-slower" />
            {["Python", "JavaScript", "Java", "C++", "Bash", "PHP", "Go"].map(
              (lang) => (
                <span
                  key={lang}
                  className="text-lg sm:text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-transform hover:scale-110"
                >
                  {lang}
                </span>
              )
            )}
          </div>
        </div>

        {/* Features */}
        <div
          id="features"
          className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-24 py-20 max-w-8xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-blue-800 mb-6 flex justify-center items-center gap-3">
              <CheckCircle className="text-blue-800" size={30} />
              What You Get
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: "Multi-Language Support",
                description:
                  "Write and execute code in 7 languages with real-time syntax highlighting.",
              },
              {
                icon: Lock,
                title: "Secure Authentication",
                description:
                  "Enhanced security with OTP-based email verification.",
              },
              {
                icon: Download,
                title: "Project Management",
                description:
                  "Create, save, and download your projects with automated backups.",
              },
              {
                icon: GitBranch,
                title: "Version Control",
                description:
                  "Built-in version control with visual diff viewer and branching.",
              },
              {
                icon: Cpu,
                title: "Real-Time Compilation",
                description: "Instant compilation with optimization tips.",
              },
              {
                icon: Sparkles,
                title: "AI Suggestions (SOON..)",
                description:
                  "Smart code completion and error detection with ML.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="feature-card bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-6 animate-pulse-glow" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-4 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Smartphone className="w-6 h-6" />
              <span className="font-semibold">
                Available on all devices - Desktop, Mobile & Tablet
              </span>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <section
          id="community"
          className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Join Our Growing Community
              </h2>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Be part of a thriving ecosystem of developers building the
                future of software development.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center space-y-3">
                  <div className="inline-flex p-4 bg-white/10 rounded-xl text-white">
                    {stat.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl lg:text-4xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-indigo-100">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 text-white">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">
                  Growing 25% month over month
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Ready to Transform Your Development Experience?
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Join millions of developers who have already made the switch
                  to cloud-based development.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/projects"
                  className="group bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg inline-block"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Start Building Today</span>
                  </div>
                </Link>
              </div>
              <div className="text-md text-slate-400">
                No credit card required • Free for personal projects
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Landing;
