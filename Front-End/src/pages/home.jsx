import React from "react";
import Categorylist from "../components/category-list";
import BannerProduct from "../components/banner-product";
import HorizontalCardProduct from "../components/horizontal-Card-product";
import VerticalCardProduct from "../components/vertical-Card-Product";

const home = () => {
  return (
    <div>
      <Categorylist />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />

      <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Popular's Mouse"} />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Popular's Television"}
      />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Refrigerator"}
      />
      <VerticalCardProduct
        category={"trimmers"}
        heading={"Trimmers"}
      />
      <VerticalCardProduct
        category={"watches"}
        heading={"Watch"}
      />
    </div>
  );
};

export default home;
