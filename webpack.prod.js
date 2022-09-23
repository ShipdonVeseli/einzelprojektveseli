const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        }
      ],
    },
  // 1
  // Use the src/index.js file as entry point to bundle it.
  // If the src/index.js file imports other JS files,
  // bundle them as well
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    dogs: path.resolve(__dirname, './src/dogs.js'),
    favs: path.resolve(__dirname, './src/fav.js')
  },
  // 2
  // The bundles source code files shall result in a bundle.js file
  // in the /dist folder
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  // 3
  // The /dist folder will be used to serve our application
  // to the browser
  devServer: {
    static: path.resolve(__dirname, './dist'),
  },
  // 4
  // Add plugins for webpack here
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({  
      title: "Basic Webpack Setup",
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({  
      filename: 'about.html',
      template: path.resolve('/src/about.html'),
    }),
    new HtmlWebpackPlugin({  
      filename: 'dogs.html',
      template: path.resolve('/src/dogs.html'),
      chunks: ['dogs']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({  
      filename: 'fav.html',
      template: path.resolve('/src/fav.html'),
      chunks: ['favs']
    })
  ]
};