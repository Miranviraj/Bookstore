import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-4 mt-10">
      <div className="text-center text-sm sm:text-base font-medium">
        &copy; {new Date().getFullYear()} — Made by <span className="text-orange-400">Miran Virajith Devinda</span>
      </div>
    </footer>
  );
}

export default Footer;
