import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // neo4j-driver uses native Node.js TCP sockets, TLS, and dns modules
  // that cannot be bundled by Vercel's serverless webpack. Keep it external.
  serverExternalPackages: ['neo4j-driver'],
};

export default nextConfig;
