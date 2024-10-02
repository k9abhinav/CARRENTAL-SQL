import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
function Footer() {
  return (

    <footer className="bg-gray-800 text-white py-4 flex min-h-[20vh] w-full items-center justify-center">
      <div className="container mx-auto flex justify-around items-center w-full">
        <div className="mr-4 flex">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white text-2xl mr-2 hover:text-blue-500" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white text-2xl mr-2 hover:text-blue-400" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-2xl mr-2 hover:text-pink-500" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-2xl hover:text-blue-600" />
          </a>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} FLEETO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer