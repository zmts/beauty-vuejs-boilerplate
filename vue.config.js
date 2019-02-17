// https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_fonts.scss";
          @import "@/scss/_medias.scss";
        `
      }
    }
  },

  devServer: {
    watchOptions: {
      poll: true,
      clientLogLevel: 'warning'
    }
  }
}
