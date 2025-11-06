import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const navigation = {
  company: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blogs" },
  ],
  contact: [
    { name: "info@abhidh.com", icon: Mail, href: "mailto:info@abhidh.com" },
    { name: "creative@abhidh.com", icon: Mail, href: "mailto:creative@abhidh.com" },
    { name: "+977-9841080407", icon: Phone, href: "tel:+9779841080407" },
    { name: "+977-9801110981", icon: Phone, href: "tel:+9779801110981" },
  ],
};

export default function Footer() {
  return (
    <footer className="gradient-primary text-primary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-2xl font-bold">
              <span className="text-secondary">Abhidh</span>
              <span className="text-primary-foreground"> Creative</span>
            </span>
            <p className="text-sm leading-6 text-primary-foreground/80">
              Where creativity meets strategy, and innovation meets technology. 
              Building digital solutions that drive meaningful growth.
            </p>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-secondary" />
              <div className="text-sm">
                <p>Nardevi, Kathmandu, Nepal</p>
                <p className="mt-1 text-primary-foreground/80">Training Venue: Jawalakhel, Ekantakuna Marg, Lalitpur</p>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-primary-foreground/80 hover:text-secondary transition-smooth"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Contact Us</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.contact.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-primary-foreground/80 hover:text-secondary transition-smooth flex items-center gap-2"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-primary-foreground/60 text-center">
            &copy; {new Date().getFullYear()} Abhidh Creative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
