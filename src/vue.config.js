module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3009/",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
