"use client";

import React from "react";
import Image from "next/image";

import amazonPay from "../../../../public/screens/Amazon_Pay_logo.png";
import masterCard from "../../../../public/screens/MasterCard-Logo.png";
import payPal from "../../../../public/screens/PayPal.png";
import googlePlay from "../../../../public/screens/get-it-on-google-play-badge.png";
import appleStore from "../../../../public/screens/get-it-on-apple-store.png";

export default function Footer() {
  return (
    <div className="w-full bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <footer className="space-y-6">
          {/* App Info */}
          <div>
            <h5 className="text-2xl font-bold text-gray-800 mb-2">
              Get the FreshCart app
            </h5>
            <h6 className="text-gray-600">
              We will send you a link, open it on your phone to download the app
            </h6>
          </div>

          {/* Email input + button */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
            <input
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Email .."
            />
            <button className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 transition">
              Share App Link
            </button>
          </div>

          <hr className="border-t border-gray-300" />

          {/* Payment Partners + App Stores */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Payment Partners */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">
                Payment Partners
              </span>
              <Image src={amazonPay} alt="Amazon Pay" width={40} height={40} />
              <Image src={masterCard} alt="MasterCard" width={40} height={40} />
              <Image src={payPal} alt="PayPal" width={40} height={40} />
            </div>

            {/* App Stores */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 font-medium">
                Get deliveries with FreshCart
              </div>
              <Image src={appleStore} alt="Apple Store" width={120} height={40} />
              <Image src={googlePlay} alt="Google Play" width={120} height={40} />
            </div>
          </div>

          <hr className="border-t border-gray-300" />
        </footer>
      </div>
    </div>
  );
}
