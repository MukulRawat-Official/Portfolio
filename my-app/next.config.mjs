/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
