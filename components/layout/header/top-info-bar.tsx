// components/layout/top-info-bar.tsx

import { Facebook, Youtube, Send, Newspaper, Instagram, Twitter } from "lucide-react";

export default function TopInfoBar() {
  const socialMediaLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      iconColor: "text-white",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      bgColor: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      iconColor: "text-white",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      hoverColor: "hover:from-purple-700 hover:to-pink-700",
      iconColor: "text-white",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      iconColor: "text-white",
    },
    {
      name: "Telegram",
      icon: Send,
      href: "https://telegram.org",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      iconColor: "text-white",
    },
  ];

  return (
    <div className="border-b border-white/10 bg-gradient-primary">
      <div className="container-8xl">
        <div className="flex h-10 items-center justify-between px-4 sm:px-0">
          {/* LEFT SIDE - Compact LIVE indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Small, centered LIVE indicator */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-5 h-5">
                {/* Small pulsing ring */}
                <div className="absolute w-3 h-3 rounded-full bg-red-500/40 animate-ping" />
                
                {/* Small center dot */}
                <div className="relative w-2 h-2 rounded-full bg-red-500" />
              </div>
              
              {/* LIVE text */}
              <span className="text-[11px] font-semibold tracking-wide text-white">
                LIVE
              </span>
            </div>
            
            {/* Latest Edition */}
            <div className="flex items-center gap-2 text-[11px] font-medium text-white/90">
              <Newspaper className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Latest Edition</span>
              <span className="sm:hidden">Latest</span>
            </div>
          </div>

          {/* RIGHT SIDE - Social Media */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs font-semibold text-white/80 tracking-wide">
                FOLLOW US
              </span>
              
              <div className="flex items-center gap-1.5">
                {socialMediaLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        relative
                        flex items-center justify-center 
                        w-8 h-8 rounded-lg
                        ${social.bgColor}
                        ${social.hoverColor}
                        ${social.iconColor}
                        transition-all duration-300
                        transform hover:-translate-y-0.5
                        shadow-md hover:shadow-xl
                        overflow-hidden
                        group
                      `}
                      aria-label={`Follow us on ${social.name}`}
                      title={`Follow us on ${social.name}`}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="h-4 w-4 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                        {social.name}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
