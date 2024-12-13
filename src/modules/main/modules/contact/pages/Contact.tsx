import React from "react";
import PhoneIcon from "../../../../../components/Icons/PhoneIcon";
import MapIcon from "../../../../../components/Icons/MapIcon";
import ClockIcon from "../../../../../components/Icons/ClockIcon";

function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center flex-col items-center">
      <h1 className="text-[36px] font-bold text-center mb-4">
        Get In Touch With Us
      </h1>
      <p className="text-center text-gray-600 mb-12 w-[644px]">
        For more information about our products & services, please feel free to
        drop us an email. Our staff is always here to help you out. Do not
        hesitate!
      </p>

      <div className="flex flex-col lg:flex-row gap-36 mt-[133px]">
        <div className="flex-1 space-y-8">
          <div className="flex items-start gap-4">
            <span className="text-xl">
              <MapIcon />
            </span>
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl">
              <PhoneIcon />
            </span>
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p>Mobile: +(+84) 546-6789</p>
              <p>Hotline: +(+84) 456-6789</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-xl">
              <ClockIcon />
            </span>
            <div>
              <h3 className="font-semibold text-lg">Working Time</h3>
              <p>Monday-Friday: 9:00 - 22:00</p>
              <p>Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 text-[23px]"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="mt-1 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 md:w-[530px]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-[23px]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 md:w-[530px]"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 text-[23px]"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="This is optional"
                className="mt-1 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm h-[75px] border-[1.5px] border-[#9F9F9F] pl-8 md:w-[530px]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 text-[23px]"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Hi! I'd like to ask about..."
                rows={4}
                className="mt-1 block w-full rounded-md shadow-sm focus:border-gold-500 focus:ring-gold-500 sm:text-sm h-[120px] border-[1.5px] border-[#9F9F9F] pl-8 md:w-[530px] pt-7"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gold-500 text-white rounded-md shadow-sm hover:bg-gold-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
