const path = require('path');

module.exports = {
    entry: './app.js', // Entry point of your application
    output: {
      filename: 'bundle.js', // Name of the output file
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // Change to 'production' for production builds
    module: {
      rules: [
        {
          test: /\.js$/, // Transform JS files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // You may need to install babel-loader for ES6 support
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };