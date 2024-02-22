/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "fakestoreapi.com",
          },
          {
            protocol: "https",
            hostname: "www.einfosoft.com",
          },
          {
            protocol: "https",
            hostname: "demos.codezeel.com",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
};

export default nextConfig;
