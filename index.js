const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
// We would need that for deep merging things in the future.
// const lodash = require('lodash');

// The following dependencies are REQUIRED at the app level
// so that we don't break the world
// - vue (3)
// - typescript (if enabled in the config), and the corresponding tsconfig.json
// - typescript config for vue (if enabled in the config)
//
// The following extensions might be overridden by the application
// - vue-loader (for v3) - to ensure it will override the apos core vue-loader
// - @vue/compiler-sfc - not really required, should be resolved from this module
// - ts-loader - not really required, should be resolved from this module
// - vue-style-loader, it's the same as the apos core dep currently
// - postcss-loader
// The following extensions are optionally controlled by the application
// - postcss-{html,css,scss}
// NOTE: If context is enabled (see below), this module should introduce ALL of
// apos core dependencies required for the src build
//
// In order to release that, we need to offer override options for almost
// everything.
module.exports = {
  bundle: {
    modules: [ '@corllete/apos-vue3-asset' ],
    directory: 'modules'
  },
  webpack: {
    extensions: {
      vue3: {
        // Use the package level dependencies
        // context: __dirname,
        resolve: {
          extensions: [ '*', '.js', '.ts', '.vue', '.json' ],
          alias: {
            // Use the application level Vue runtime when building.
            // We can't use the aposNpmRoot here because we don't have acces
            // to the instance.
            vue$: path.resolve(
              process.cwd(),
              './node_modules/vue/dist/vue.runtime.esm-bundler.js'
            )
          }
        },
        // Introduce the right resolve paths for loaders
        // - this module
        // - the application
        // - apostrophe node modules as fallback
        // This is possible because of the module that improves the core assets.
        // XXX - this will become an option `extensionsOptions.vue3(options)`
        resolveLoader: {
          extensions: [ '*', '.js', '.ts', '.vue', '.json' ],
          modules: [
            path.join(__dirname, 'node_modules'),
            'node_modules',
            'node_modules/apostrophe/node_modules'
          ]
        },
        module: {
          rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                // XXX- It is really not clear how to proceed here.
                // Generally we want esm.
                // esModule: true,
                sourceMap: true
              }
            },
            // Parse .ts and .vue files. XXX Will be an option.
            {
              test: /\.ts$/,
              loader: 'ts-loader',
              exclude: [ '/node_modules/' ],
              options: {
                appendTsSuffixTo: [ /\.vue$/ ]
              }
            }
            // Add support for <style> tags.
            // The scss/postcss support is added by the core?
            // TODO options so devs can ignore paths (e.g. tailwind) or completely
            // disable the rule.
            // {
            //   test: /\.css$/,
            //   use: [
            //     'vue-style-loader',
            //     'style-loader',
            //     'css-loader',
            //     'postcss-loader'
            //   ]
            // }
          ]
        },
        plugins: [
          new VueLoaderPlugin(),
          // XXX Recommended setup by the Vue folks, should be option
          new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
          })
        ]
      }
    }
  }
};
