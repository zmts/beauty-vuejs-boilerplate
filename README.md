# Real World Vue.js Boilerplate
This project based on real world practice and ready to use. Have a fun!

## Features
- Http request class that implements API calls with Auth and tokens refresh based on Axios
- Base API call methods
- Base common and layout components
- Some help mixins

## Project structure
- [`index.html`](#indexhtml)
- [`src`](#src)
  - [`assets`](#assets)
  - [`components`](#components)
  - [`config`](#config)
  - [`layout`](#layout)
  - [`mixins`](#mixins)
  - [`pages`](#pages)
  - [`router`](#router)
  - [`scss`](#scss)
  - [`services`](#services)
  - [`store`](#store)
  - [`.env.js`](#envjs)
  - [`app.init.js`](#appinitjs)
  - [`global.helpers.js`](#globalhelpersjs)

### `index.html`
Main index HTML file.

### `src`
Source =)

### `assets`
Images/Fonts/Other media stuff.

### `components`
Shared components folder.

### `config`
App config files.

### `mixins`
Mixins helpers. (Declare global mixins as `$someMixinName.js`). 

### `pages`
Page wrapper components(Pages) and Local components.

### `router`
Router instance and routing declaration.

### `scss`
Style files(partials, variables, mixins, reset).

### `services`
API layer.

### `store`
App store and modules.

### `.env.js`
Environment variables (add this to git ignore).

### `app.init.js`
Root app initialization file.

### `global.helpers.js`
Add global helpers to window object.

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
