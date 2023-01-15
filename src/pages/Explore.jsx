import React from "react";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* Slider */}

        <p className="exploreCategoryHeading">Categories</p>

        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Places for rent</div>
          </Link>
          <Link to="/category/multispecialty">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Places for sale</div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
