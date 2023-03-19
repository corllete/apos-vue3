const _ = require('lodash');

// Add `'@corllete/apos-vue3-asset': {};` to your app.js
module.exports = {
  improve: '@apostrophecms/asset',

  methods() {
    return {
      srcCustomizeArray(a, b, key) {
        if (
          [
            'resolveLoader.extensions',
            'resolve.extensions',
            'resolve.modules'
          ].includes(key)
        ) {
          return _.uniq([ ...a, ...b ]);
        }
        // Let resolve modules from this or any consequent module
        //  win - reverse array merge
        if (key === 'resolveLoader.modules') {
          return _.uniq([ ...b, ...a ]);
        }
      }
    };
  }
};
