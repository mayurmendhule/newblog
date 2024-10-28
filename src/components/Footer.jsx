import React from 'react';

const Footer = () => {
  return (
    <footer className="px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      {/* <div className="container px-6 py-8 mx-auto"> */}
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
       { /*      # Email Configuration
SENDGRID_API_KEY= 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
EMAIL_USER=mmendhule2303@gmail.com  # Your verified sender email */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">© Copyright 2024. All Rights Reserved.</p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Teams">
              Teams
            </a>

            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Privacy">
              Privacy
            </a>

            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Cookies">
              Cookies
            </a>
  
        </div>
      </div>
    </footer>
  );
};

export default Footer;

