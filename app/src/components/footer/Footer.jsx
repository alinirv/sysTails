import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 Arvic. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;