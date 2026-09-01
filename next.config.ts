import type { NextConfig } from "next";

// GitHub Pages 專案站台放在 /tools 子路徑；只有部署建置時才加前綴
const deploy = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(deploy ? { basePath: "/tools", assetPrefix: "/tools/" } : {}),
};

export default nextConfig;
