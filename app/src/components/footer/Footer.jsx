import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8">
        <p>Gaia: O Prelúdio é um produto da Auroria – Game Studio e seus respectivos criadores, todos os direitos reservados.</p>
      </div>
      
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