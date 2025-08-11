import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sib-api-v3-sdk'], 

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
