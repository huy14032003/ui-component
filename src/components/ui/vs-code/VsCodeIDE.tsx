import React from 'react';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import { IdeLayout } from './ide/IdeLayout';

const myCodeSandboxTheme = {
  colors: {
    surface1: '#151515',
    surface2: '#151515',
    surface3: '#2a2a2a',
    clickable: '#999999',
    base: '#808080',
    disabled: '#4d4d4d',
    hover: '#ffffff',
    accent: '#007acc',
    error: '#ff453a',
    errorSurface: '#ffeceb',
  },
  syntax: {
    plain: '#d4d4d4',
    comment: { color: '#6a9955', fontStyle: 'italic' as 'italic' },
    keyword: '#c586c0',
    tag: '#569cd6',
    punctuation: '#d4d4d4',
    definition: '#dcdcaa',
    property: '#9cdcfe',
    static: '#b5cea8',
    string: '#ce9178',
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Fira Code", "Fira Mono", Consolas, Menlo, Monaco, "Courier New", monospace',
    size: '13px',
    lineHeight: '20px',
  },
};

import { initialFiles } from './initialFiles';

export function VsCodeIDE() {
  return (
    <SandpackProvider
      template="react"
      theme={myCodeSandboxTheme}
      files={initialFiles}
      customSetup={{
         dependencies: {
           "react": "^18.0.0",
           "react-dom": "^18.0.0",
           "react-scripts": "^5.0.0"
         }
      }}
      options={{
        classes: {
          'sp-wrapper': 'h-full',
          'sp-layout': 'h-full rounded-none border-none bg-transparent',
        },
      }}
    >
      <IdeLayout />
    </SandpackProvider>
  );
}
