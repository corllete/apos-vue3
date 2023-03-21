# Apostrophe CMS module bundle for Vue 3 Webpack configuration

This bundle provides a Vue 3 Webpack configuration for Apostrophe CMS public builds.
Do not use in production yet, but only for PoC and demonstration purposes. It's a work in progress.

## Installation

```bash
# NO @ at the start! It's not really a npm plugin yet.
npm i corllete/apos-vue3 vue
```

In your `app.js`:

```js
{
  // There IS @ at the start here
  '@corllete/apos-vue3': {},
  '@corllete/apos-vue3-asset': {},
}
```

Done! Your Vue 3 sources should be built now, you just need to mount your Vue app (in any `module-name/ui/src/index.js`).
