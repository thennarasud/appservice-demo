const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app.js', // Entry point of your application
    output: {
        filename: 'bundle.js', // Name of the output file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // Change to 'production' for production builds
    target: 'node', // Specify that you're targeting Node.js
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
    resolve: {
        fallback: {
            async_hooks: false, // Ignore async_hooks module
            '@mongodb-js/zstd': false,
            '@aws-sdk/credential-providers': false,
            'gcp-metadata': false,
            'snappy': false,
            'socks': false,
            'aws4': false,
            'mongodb-client-encryption': false,
        },
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^@mongodb-js\/zstd$|^@aws-sdk\/credential-providers$|^gcp-metadata$|^snappy$|^socks$|^aws4$|^mongodb-client-encryption$/
        })
    ]
};
