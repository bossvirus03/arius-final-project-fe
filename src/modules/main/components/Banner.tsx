import React from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/MotionEffect";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[calc(100vh-100px)] bg-hero bg-no-repeat bg-cover">
      <div className="container relative h-full">
        <div className="absolute max-h-[443px] top-[40px] lg:top-[154px] left-[50%] lg:right-[50px] lg:transform-none transform -translate-x-[50%] bg-[#FFF3E3] md:w-[65%] rounded-lg shadow-lg px-10 py-16 lg:w-[45%] 2xl:w-[50%] w-[80%] md:h-[60vh] h-auto">
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            // animate="visible"
            // transition={{ duration: 0.5 }}
            className="flex flex-col justify-between "
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }}
          >
            <div>
              <p className="text-sm font-semibold text-gray-600 text-[18px]">
                New Arrival
              </p>
              <h1 className="md:text-6xl text-4xl font-extrabold text-[#B88E2F] leading-tight mt-4">
                Discover Our New Collection
              </h1>
              <p className="mt-4 text-[18px] font-semibold leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
            <Button
              className="mt-auto w-[200px] md:w-[250px] h-[60px] text-lg font-semibold bg-[#B88E2F] text-white hover:bg-[#9b752a] transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/shop")}
            >
              BUY NOW
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
