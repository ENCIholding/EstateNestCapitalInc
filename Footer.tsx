import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Real Estate Investment", path: "/#about" },
        { label: "Investment Excellence", path: "/investor-relations" },
        { label: "Capital Solutions", path: "/investor-relations" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/#about" },
        { label: "Careers", path: "/careers" },
        { label: "Contact", path: "/#appointment", isContact: true }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "hello@estatenest.capital", path: "mailto:hello@estatenest.capital", isEmail: true },
        { label: "780-860-3191", path: "tel:780-860-3191", isPhone: true }
      ]
    }
  ];

  return (
    <footer className="bg-enc-text-primary text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                ESTATE NEST
                <br />
                CAPITAL
              </h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              Strategic real estate investments and capital solutions based in Edmonton, Alberta.
            </p>
            <div className="text-sm text-white/70 space-y-1">
              <p>Edmonton, Alberta, Canada</p>
              <p>hello@estatenest.capital</p>
              <p>www.estatenest.capital</p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.isEmail || link.isPhone ? (
                      <a 
                        href={link.path}
                        className="text-white/70 hover:text-enc-orange-light transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (link as any).isContact ? (
                      <a 
                        href={link.path}
                        className="text-white/70 hover:text-enc-orange-light transition-colors text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {link.label}
                      </a>
                    ) : link.path.startsWith("/#") ? (
                      <a 
                        href={link.path}
                        className="text-white/70 hover:text-enc-orange-light transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link 
                        to={link.path}
                        className="text-white/70 hover:text-enc-orange-light transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-white/60">
            © 2025 Estate Nest Capital Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-white/60">
            <div className="group relative">
              <a href="#" className="hover:text-enc-orange-light hover:scale-105 transition-all duration-300">Privacy Policy</a>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-5 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Privacy Policy - Alberta Compliant</h4>
                <div className="text-xs text-gray-700 space-y-2">
                  <p>• <strong>Personal Information Protection:</strong> Collection and use governed by Alberta's PIPA</p>
                  <p>• <strong>Data Usage:</strong> Information used only for service delivery and communication</p>
                  <p>• <strong>Consent Management:</strong> Right to withdraw consent at any time</p>
                  <p>• <strong>Third-Party Services:</strong> Limited sharing with trusted partners only</p>
                  <p>• <strong>Security Measures:</strong> Industry-standard encryption and protection</p>
                  <p>• <strong>Access Rights:</strong> Request access to or correction of your personal data</p>
                  <p>• <strong>Retention:</strong> Data retained only as long as necessary or required by law</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <a href="#" className="hover:text-enc-orange-light hover:scale-105 transition-all duration-300">Terms of Use</a>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-5 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Terms of Use - Alberta Construction</h4>
                <div className="text-xs text-gray-700 space-y-2">
                  <p>• <strong>Service Guidelines:</strong> Professional construction services per Alberta Building Code</p>
                  <p>• <strong>User Responsibilities:</strong> Accurate information and timely payment required</p>
                  <p>• <strong>Contract Terms:</strong> Written agreements govern all construction projects</p>
                  <p>• <strong>Intellectual Property:</strong> Designs and plans remain property of ENCI until paid</p>
                  <p>• <strong>Liability Limits:</strong> Coverage as per Alberta construction law</p>
                  <p>• <strong>Dispute Resolution:</strong> Governed by Alberta law and jurisdiction</p>
                  <p>• <strong>Warranty Terms:</strong> Progressive Home Warranty coverage applies</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <a href="#" className="hover:text-enc-orange-light hover:scale-105 transition-all duration-300">Cookie Policy</a>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-5 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Cookie Policy</h4>
                <div className="text-xs text-gray-700 space-y-2">
                  <p>• <strong>Essential Cookies:</strong> Required for website functionality and security</p>
                  <p>• <strong>Analytics:</strong> Track site performance and user experience improvements</p>
                  <p>• <strong>Marketing:</strong> Used with consent for targeted communications</p>
                  <p>• <strong>Preferences:</strong> Remember your settings and choices</p>
                  <p>• <strong>Third-Party:</strong> Google Analytics and similar services</p>
                  <p>• <strong>Consent Management:</strong> Control cookie preferences anytime</p>
                  <p>• <strong>Data Retention:</strong> Cookies expire per category timelines</p>
                </div>
              </div>
            </div>
            <div className="group relative">
              <Link to="/accessibility" className="hover:text-enc-orange-light hover:scale-105 transition-all duration-300">Accessibility</Link>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-5 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Accessibility - AODA Compliant</h4>
                <div className="text-xs text-gray-700 space-y-2">
                  <p>• <strong>WCAG 2.1 Level AA:</strong> Web accessibility standards compliance</p>
                  <p>• <strong>Alberta Building Code:</strong> Barrier-free design in all projects</p>
                  <p>• <strong>Keyboard Navigation:</strong> Full website accessibility without mouse</p>
                  <p>• <strong>Screen Readers:</strong> Compatible with assistive technologies</p>
                  <p>• <strong>Aging-in-Place:</strong> Accessible features in residential designs</p>
                  <p>• <strong>Feedback Welcome:</strong> Report accessibility concerns anytime</p>
                  <p>• <strong>Continuous Improvement:</strong> Regular accessibility audits</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
