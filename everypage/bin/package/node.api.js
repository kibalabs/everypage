const path = require('path');

export default () => ({
  webpack: (currentWebpackConfig) => {
    return {
      ...currentWebpackConfig,
      resolve: {
        alias: {
          'react': path.resolve(path.join(process.cwd(), './node_modules'), 'react'),
          'react-dom': path.resolve(path.join(process.cwd(), './node_modules'), 'react-dom'),
          'styled-components': path.resolve(path.join(process.cwd(), './node_modules'), 'styled-components'),
          '@kibalabs/react-static': path.resolve(path.join(process.cwd(), './node_modules'), '@kibalabs/react-static'),
        },
      },
    };
  },
})
