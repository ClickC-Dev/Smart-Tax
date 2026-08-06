import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/painel-adm',
  assetPrefix: process.env.VERCEL_ENV === 'production' ? 'https://smart-tax-painel.vercel.app/painel-adm' : undefined,
};

export default nextConfig;
