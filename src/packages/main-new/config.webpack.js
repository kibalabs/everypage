const path = require('path');

const babelConfig = (config = {}) => ({
  presets: [
    ["@babel/preset-env", config.polyfill ? {
      useBuiltIns: "usage",
      corejs: {
        version: 3.6,
        proposals: true,
      },
      targets: "defaults, >0.2%, not dead, ie 11",
    } : {}],
    "@babel/preset-typescript",
    ...(config.react ? ["@babel/preset-react"] : [])
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    ...(config.react ? ["react-hot-loader/babel"] : [])
  ],
})

module.exports = (config) => {
  config.entry = typeof config.entry === 'string' ? [config.entry] : config.entry;
  config.entry.unshift('regenerator-runtime/runtime');

  config.module.rules.push({
    test: /\.(j|t)sx?$/,
    exclude: /(node_modules|build|dist)\//,
    use: {
      loader: 'babel-loader',
      options: babelConfig({react: true}),
    }
  });
  return config;
};
