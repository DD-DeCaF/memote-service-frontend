# Memote

This is the frontend client for the memote.io web site, a free online service providing access to memote, the metabolic model test suite. See also the [backend service implementation](https://github.com/dd-decaf/memote-webservice).

For more information about memote, see [opencobra/memote](https://github.com/opencobra/memote).

## Technology stack

* Frontend framework: [Vue](https://vuejs.org/)
* State management: [Vuex](https://vuex.vuejs.org/)
* Linting provided by: [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue/)
  * Linter: [eslint](https://eslint.org/), see `package.json` for configuration
* Testing provided by: [@vue/cli-plugin-unit-mocha](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha)
  * Tests are run with [mocha](https://mochajs.org/) and [jsdom](https://github.com/jsdom/jsdom)
  * The assertion library is [chai](https://www.chaijs.com/), see also the [assertion style docs](https://www.chaijs.com/guide/styles/)
  * [vue-test-utils](https://vue-test-utils.vuejs.org/) provides useful utilities

## Development

### Install dependencies
```
npm install
```

### Run local development webserver with hot-reloading
```
npm run serve
```

### Run linter, fix errors
```
npm run lint
```

### Run linter, only report errors
```
npx vue-cli-service lint --no-fix
```

### Run unit tests once
```
npm run test:unit
```

### Run unit tests in watch mode
```
npx vue-cli-service test:unit -w
```

### Compile and minify for deployment
```
npm run build
```
