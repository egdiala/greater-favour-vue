const dotenv =  require("dotenv-webpack");
module.exports = {
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  },
  devServer: {
    host: 'localhost',
  },
  configureWebpack: {
    plugins: [
      new dotenv()
    ]
  }
}
