const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  
  webpack: (config, { isServer }) => {
    
    if (!isServer) {
      config.resolve.alias = {
        '@assets': path.resolve(__dirname, 'assets'),
        '@components': path.resolve(__dirname, 'components'),
        '@public': path.resolve(__dirname, 'public'),
        '@styles': path.resolve(__dirname, 'styles'),
        '@utils': path.resolve(__dirname, 'utils'),
        '@app': path.resolve(__dirname, 'app'),
      };
    }
    return config;
  },
};

// Export the configuration
module.exports = nextConfig;
