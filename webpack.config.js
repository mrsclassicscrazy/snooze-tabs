var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
      from: __dirname + '/src/manifest.json', to: __dirname + '/dist/manifest.json'
    },
    {
      from: __dirname + '/src/background/index.js', to: __dirname + '/dist/background.js'
    },
    {
      from: __dirname + '/resources/', to: __dirname + "/dist/resources"
    }
]);

var PopupHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/popup/index.html",
  filename: "popup.html",
  chunks: [ "popup" ]
})

var SidebarHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/sidebar/index.html",
  filename: "sidebar.html",
  chunks: ["sidebar"]
})

var ExtractTextPluginConfig = new ExtractTextPlugin("[name].css");

module.exports = {
    entry: {
      content_script: './src/content_script/index.js',
      popup: './src/popup/index.js',
      sidebar: './src/sidebar/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css$/, loader: ExtractTextPlugin.extract(["css-loader"]) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract(["css-loader", "less-loader"]) },
      { test: /\.(eot|svg|ttf|woff)$/, loader: "file-loader"}
    ]
  },
  plugins: [CopyWebpackPluginConfig, PopupHtmlWebpackPluginConfig, SidebarHtmlWebpackPluginConfig, ExtractTextPluginConfig]
}
