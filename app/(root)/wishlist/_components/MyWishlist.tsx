"use client"

import React from 'react'

const MyWishlist = () => {
  const wishlists: any[] = [];
  return (
    <>

      {wishlists && wishlists.length > 0 ? (
        <div className="my-10">
          <p>My Wishlist</p>
        </div>
      ) : (
        <div className="max-w-xl w-full mx-auto my-10 ">
          <p className="mb-2 text-sm">My Wishlist</p>
          <div className="py-8 border-t border-b">
            <p className="text-sm text-center">
              No products added to the wishlist
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MyWishlist