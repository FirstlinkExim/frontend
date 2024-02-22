import React from "react";
import MyWishlist from "./_components/MyWishlist";

const WishlistPage = () => {
  return (
    <div className="container py-4 my-8">
      <p className="text-center text-5xl font-thin">Wishlist</p>

      <MyWishlist />
    </div>
  );
};

export default WishlistPage;
