# Redux Toolkit TypeScript Example

yarn dev
Starts the development server.

yarn build
Builds the app for production.

yarn start
Runs the built app in production mode.

This example shows how to integrate Next.js with [Redux Toolkit](https://redux-toolkit.js.org).

The **Redux Toolkit** is a standardized way to write Redux logic (create actions and reducers, setup the store with some default middlewares like redux devtools extension). This example demonstrates each of these features with Next.js

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-redux-toolkit-typescript&project-name=with-redux-toolkit&repository-name=with-redux-toolkit)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-redux-toolkit-typescript with-redux-toolkit-app
# or
yarn create next-app --example with-redux-toolkit-typescript with-redux-toolkit-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Styling

https://nextjs.org/docs/basic-features/built-in-css-support

- CSS in TSX (https://github.com/vercel/styled-jsx)

```tsx
<style>
  {`
          .lang_select {
            margin-left: 5px;
          }
          .lang_select .p-splitbutton-defaultbutton {
            margin-right: -10px;
          }
        `}
</style>
// <style jsx> - doesn't work with .tsx!
```

- CSS Modules: https://github.com/css-modules/css-modules
  :global switches to global scope for the current selector respective identifier. :global(.xxx) respective @keyframes :global(xxx) declares the stuff in parenthesis in the global scope.
  Similarly, :local and :local(...) for local scope.
  If the selector is switched into global mode, global mode is also activated for the rules. (This allows us to make animation: abc; local.)
  Example: .localA :global .global-b .global-c :local(.localD.localE) .global-d

```css
.select {
  margin-left: 5px;
}
.select :global .p-splitbutton-defaultbutton {
  margin-right: -10px;
}
```

- SASS(SCSS) with CSS Modules: https://www.freecodecamp.org/news/how-to-use-sass-with-css-modules-in-next-js/
