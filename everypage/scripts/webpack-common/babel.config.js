const isDevelopment = process.env.CARBON_BUILD_MODE === 'development';

module.exports = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: "usage",
      corejs: {
        version: 3,
        proposals: true,
      },
      targets: ">0.2%, not dead, not ie < 10",
    }],
    "@babel/preset-typescript",
    // TODO(krish): should we move react to the react folder or is it fine here? (same for the reloader below)
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    ...(isDevelopment ? ["react-hot-loader/babel"] : []),
  ],
}
