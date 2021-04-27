# Real World Vue.js Boilerplate
This project based on real world practice and ready to use. Have a fun!

## Features
- Http request class that implements API calls with Auth and tokens refresh based on Axios
- Data access layer/API calls
- Response wrapper/Response error wrapper
- Base common and layout components
- Some help mixins
- Vue CLI v4
- Developed to work with: https://github.com/zmts/supra-api-nodejs

## Project structure
- [`src`](#src)
  - [`assets`](#assets)
  - [`components`](#components)
  - [`config`](#config)
  - [`directives`](#directives)
  - [`layout`](#layout)
  - [`mixins`](#mixins)
  - [`pages`](#pages)
  - [`plugins`](#plugins)
  - [`router`](#router)
  - [`scss`](#scss)
  - [`services`](#services)
  - [`store`](#store)
  - [`.env.js`](#envjs)
  - [`main.js`](#mainjs)

### `src`
Source =)

### `assets`
Images/Fonts/Other media stuff.

### `components`
Shared components folder.
- `DataBox` wrap in this component any received data. It represents loading(spinloader animation), error and empty statuses (examaple in `src/pages/News.vue`).
- `UiImgLoader` - `img` tag wrapper. Shows image loading(pulseloader animation) status and animate onloading as option.
- `UiModal` - simple modal window.
- `PulseLoading` and `SpinnerWave` - loading animation.
- `UiUploadMulti` and `UiUploadSingle` - file upload example components.
- ...

### `config`
App config files. Each category in separate file.

### `directives`
- Handy debounce directive

### `layout`
Base app layout components.
- `Header`, `Footer` components and main layout wrapper.

### `mixins`
- One method/prop per file principle.
- Name files same as method/prop.
- `currentUser` - Includes current user object from store. Global.
- `formatDateTime` - Datetime moment formatters. Global.
- `jumpTo` - Help jump to some DOM element. Global.
- `prepareFetchParamsMixin` - Prepare params for data fetching (examaple in `src/pages/News.vue`).
- `prepareQueryParamsMixin` - Prepare params for setting it in URL (examaple in `src/pages/News.vue`).
- `setModelMixin` - Use to set same fields from response that declared in front-end model.

### `pages`
Page wrapper components(Pages) and Local components.

### `plugins`
- `globalEventBus` - $bus.

### `router`
Router instance and routing declaration.
- `index` - router initialization.
- `routes` - routing.
- `middlewares`:
  - `initCurrentUserStateMiddleware` - Current user state initialization (each time app loads, check refresh token and fetch current user if token exist.)
  - `checkAccessMiddleware` - Each time user change route, check permissions to route.
  - `setPageTitleMiddleware` - Each time user change route, set page title.
- `util`:
  - `routePropResolver` - Pass params from URL to component as props (example in `src/router/routes.js`)

### `scss`
Style files(partials, variables, mixins, reset).

### `services`
Data access layer/API calls.
- ES6 API calls classes.
- API calls must be represented in separate classes (not in vuex action).
- `auth.service` - Auth methods and API calls.
- `http.init` - Http request class.
- `util`:
  - `ResponseWrapper` - Represent response object.
  - `ErrorWrapper` - Represent error object.
  - `clearData` - Uses to clear request data before send it. Helper.

### `store`
App store with separate modules.

### `.env.js`
Environment variables (add this to git ignore).

### `main.js`
Root app initialization file.

### How to declare global SCSS variables/mixins etc... ?
In `/build/utils.js` >> `generateLoaders('sass')`

## Utils/Helpers

### What about debounce ?
```
import debounce from '../directives/debounce'
directives: {
  debounce
}
```
And use it in a template.
```
<input type="text" v-model="name" v-debounce="500" @debounce-change="runSomeMethod">
```

### Notifications/Toast:
Just make mutation
```
commit('dom/TOAST', { message: 'hello', duration: 2000, type: 'success' })
```

### Icons/SVG:
Set up yours svg icons in `src/components/icons/` folder. Modify `UiIconBase.vue` related to yours newly added icons and use it in template.
```
<UiIconBase size="40" color="yellow" icon="write"/>
```

## Build Setup
``` bash
# clone repo
git clone https://github.com/zmts/vuejs-boilerplate.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Amazing repos where I found some great approaches:
- https://github.com/sdras/vue-sample-svg-icons
- https://github.com/MillerRen/vue-boilerplate
- https://github.com/vuejs-tips/v-debounce

__!!! Project still in progress !!!__

_2017 - 2018 - 2019 - 2020 ..._
