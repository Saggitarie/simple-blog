# Simple Blog App With Paginated Interface

This is a Simple Blog Website That Gets Posts and Comments from JSON API.

<br/>

# Installation / Quick Start

## Folder Structure

The folder structure of this project is based on feature-based concept.

```
simple-blog
└── src
│   ├── app
│   │   ├── /* redux store configurationrelated are placed here */
│   ├── assets
│   │   ├── /* images / css files with common styles are placed here */
│   ├── components
│   │   ├── /* reusable components are placed here */
│   ├── features
│   │   ├── /* features are placed here */
│   ├── routes
│   │   ├── /* routes components are placed here */
│   ├── types
│   │   ├── /* typescript types are placed here */
│   ├── index.tsx
│   ├── react-app-end.d.ts
│   └── setupTests.js
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── craco.config.js
├── package.json
├── README.md
├── tsconfig.json
└── tsconfig.path.json
```

Once `git clone` from the repository, you can go into the project folder:

```
cd simple-blog
```

### RUN `yarn`

<br/>

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

# Features

This project includes the following features:

- Each screen shows a maximum of 5 posts
- The Prev and Next Button that help navigate between list of posts
- The Prev button will be disabled on the initial screen
- The Next button will be disabled if there are no more posts
- Underneath each post is a toggleable button to view all the comments for that post.
- When the button is clicked, a new section will expand out to show a list of
  comments. If it is clicked again, the comments section will close.
- The search box will search the title and body of the posts that were retrieved. (Strict String Search)
- UI should be responsive and usable on desktop, mobile, and tablet screen
  sizes

# API

Sample Data are taked from [JSON Placeholder](https://jsonplaceholder.typicode.com/)

### 1. Posts Endpoint

[https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

### 2. Comments Endpoint

[https://jsonplaceholder.typicode.com/comments](https://jsonplaceholder.typicode.com/comments)

<br/>

# Tech Stack / Libraries Used

1. [ReactJS](https://reactjs.org/) – A JavaScript library for building UI
2. [TypeScript](https://www.typescriptlang.org/) - JavaScript With Syntax For Types.
3. [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
4. [ESLint](https://eslint.org/) - Pluggable JavaScript linter
5. [Prettier](https://prettier.io/) - Opinionated Code Formatter
6. [Create React App](https://create-react-app.dev/) - tool to set up react app with one command
7. [Create React App Configuration Override(CRACO)](https://github.com/gsoft-inc/craco) - easy and comprehensible configuration layer for create-react-app
8. [React Router](https://reactrouter.com/) - Declarative routing for React apps at any scale
9. [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
10. [React Testing Library](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices for React
11. [Jest](https://jestjs.io/) - JavaScript Testing Framework
12. [Jest-DOM](https://github.com/testing-library/jest-dom) - Custom jest matchers to test the state of the DOM
13. [Lodash](https://lodash.com/) - a modern JavaScript utility library delivering modularity, performance & extras.
14. [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/) - provides simple React.js spinner component which can be implemented for async wait operation before data load
15. [React-Redux](https://react-redux.js.org/) - official React bindings for Redux
16. [SASS](https://sass-lang.com/) - CSS extension language for better styling

---

<br/>

### License : [MIT](https://opensource.org/licenses/MIT)
