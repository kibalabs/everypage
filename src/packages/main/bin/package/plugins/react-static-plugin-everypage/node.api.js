export default () => ({
  webpack: (config) => {
    // https://github.com/react-static/react-static/pull/1329
    config.output.publicPath = process.env.REACT_STATIC_ASSETS_PATH || '/';
    return config;
  },
});
