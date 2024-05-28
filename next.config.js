const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack: (config) => {
    // Add custom path aliases
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'styles');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'utils');
    config.resolve.alias['@assets'] = path.resolve(__dirname, 'assets');


    return config;
  },
};

module.exports = nextConfig;
