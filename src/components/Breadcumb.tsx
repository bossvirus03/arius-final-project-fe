import React from "react";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb != "")
    .map((crumb) => {
      currentLink += "/" + crumb.trim();

      return (
        <li key={crumb} className="flex items-center justify-center">
          <p className="font-bold">&nbsp;/&nbsp;</p>
          <Link
            className="crumb-item first-letter:capitalize hover:text-gray-800 hover:font-semibold"
            to={currentLink}
          >
            {crumb}
          </Link>
        </li>
      );
    });

  return (
    <div
      className={[
        `relative bg-cover`,
        crumbs.length > 1 ? "h-[100px] bg-[#F9F1E7]" : "h-[316px] ",
      ].join(" ")}
    >
      <div
        className={[
          `relative bg-cover container px-[100px]`,
          crumbs.length > 1 ? "h-[100px] bg-[#F9F1E7]" : "h-[316px] ",
        ].join(" ")}
        style={{
          backgroundImage:
            crumbs.length < 2
              ? "url('https://plus.unsplash.com/premium_photo-1683121150169-4b0f6c92a3ac?q=80&w=2309&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
              : "",
        }}
      >
        <div
          className={[
            "h-full flex items-center justify-center flex-col",
            crumbs.length < 2 ? "mx-auto" : "",
          ].join(" ")}
        >
          {crumbs.length < 2 && (
            <h1 className="z-[4] mb-2 text-5xl font-semibold text-center text-gray-800 first-letter:uppercase">
              {location.pathname.split("/")[1]}
            </h1>
          )}
          <nav className="z-[4] text-sm text-gray-600">
            <ul className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-gray-800 hover:font-semibold">
                  Home
                </a>
              </li>
              {crumbs}
            </ul>
          </nav>
        </div>
        {crumbs.length < 2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"></div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
