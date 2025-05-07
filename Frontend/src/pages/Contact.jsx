import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

function Contact() {
  return (
    <div className="bg-zinc-800 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-3xl mx-auto shadow-xl rounded-2xl p-10 bg-zinc-700 text-orange-300">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

        <p className="text-center mb-10">
          We'd love to connect with you! Reach out via any of the following platforms:
        </p>

        <div className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <Phone />
            <a href="tel:+94716270968" className="hover:underline">+94 77 123 4567</a>
          </div>

          <div className="flex items-center gap-4">
            <Mail />
            <a href="bookhub@gmail.com" className="hover:underline">support@bookverse.lk</a>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Facebook />
            <a href="https://facebook.com/bookhub" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Facebook
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Instagram />
            <a href="https://instagram.com/bookhub" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Linkedin />
            <a href="https://linkedin.com/company/bookhub" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
