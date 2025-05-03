import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
      'pdfjs-dist/build/pdf.worker.min.js': require.resolve(
        'pdfjs-dist/build/pdf.worker.min.js'
      ),
    };
    return config;
  },

  experimental: {
    // ✅ Remove appDir, no longer required
    mdxRs: true,
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;
