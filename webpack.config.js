const path = require('path');
const port = 3000;

const config ={
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: port
  },

  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development'
};

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {hot: false, contentBase: path.resolve(__dirname, 'dist')});

server.listen(port);
