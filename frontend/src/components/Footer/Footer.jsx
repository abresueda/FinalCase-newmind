import React from 'react';
import FooterCard from "../../assets/footerCard.jpeg";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <p>© 2024 ALASKA E-Commerce. All Rights Reserved.</p>
      <img
              src={ FooterCard }
              className="d-block w-100"
              alt="footer card img"
              style={{ height: "40px"}}
            />
    </footer>
  );
};

export default Footer;
