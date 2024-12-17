import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/MotionEffect";
import { LazyLoadImage } from "react-lazy-load-image-component";
const BrowseTheRange = () => {
  const categories = [
    {
      fade: "right",
      title: "Dining",
      imageUrl:
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      fade: "up",
      title: "Living",
      imageUrl:
        "https://images.unsplash.com/photo-1701421047853-3b367b83a44d?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      fade: "left",
      title: "Bedroom",
      imageUrl:
        "https://images.unsplash.com/photo-1701421052815-a66c64693978?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="container px-4 py-16 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center">Browse The Range</h2>
      <p className="mb-12 text-center text-gray-500 text-[20px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => (
          <motion.div
            variants={fadeIn(category.fade, 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
            key={category.title}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
          >
            <LazyLoadImage
              src={category.imageUrl}
              alt={category.title}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 transition-all duration-300 bg-black opacity-50 group-hover:opacity-0"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-xl font-semibold text-white">
                {category.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTheRange;
