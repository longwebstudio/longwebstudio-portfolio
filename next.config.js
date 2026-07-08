/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'longwebstudio.io.vn', // Thay thế bằng domain chứa mã nguồn WordPress của bạn
        },
      ],
    },
  };
  
  export default nextConfig;
  