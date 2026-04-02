export const initialFiles = {
  '/public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  '/App.js': `import React from 'react';
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Professional Web IDE</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`,
  '/index.js': `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  '/styles.css': `.App {
  font-family: sans-serif;
  text-align: center;
}
`,
  '/package.json': `{
  "name": "react-playground",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^5.0.0"
  },
  "main": "/index.js"
}
`
};
