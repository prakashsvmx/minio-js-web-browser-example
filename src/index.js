import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { ConfigProvider as AvatarConfigProvider } from 'react-avatar';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
      <AvatarConfigProvider colors={['A03C78', 'ED8E7C','93D9A3', 'CDF3A2']}>
        <App />
      </AvatarConfigProvider>
  </React.StrictMode>,
  rootElement
);
