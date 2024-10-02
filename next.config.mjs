/** @type {import('next').NextConfig} */
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});
const nextConfig = {
  output: "standalone",
};

export default withPWA(nextConfig);
