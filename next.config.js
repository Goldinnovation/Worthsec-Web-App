import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    config.resolve.alias['@server'] = path.resolve(__dirname, 'server');
    config.resolve.alias['@'] = path.resolve(__dirname);


    return config;
  },
};

export default nextConfig

