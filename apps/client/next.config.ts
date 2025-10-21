// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  compiler: {
    relay: {
      src: './',
      language: 'typescript',
      artifactDirectory: './src/app/__generated__',
    },
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;
