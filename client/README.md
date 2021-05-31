## Web client on Next.js

- client - Web client with SSR on NextJS, TypeScript, React, Redux-Toolkit, PrimeReact

### Create initial app structure

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
