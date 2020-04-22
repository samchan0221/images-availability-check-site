import React from 'react';
import './App.css';
import {CssBaseline} from "@material-ui/core";
import {MainView} from "./Components/MainView/MainView";
import {StylesProvider} from '@material-ui/core/styles';

function App() {
  return (
    <StylesProvider injectFirst={true}>
        <CssBaseline/>
        <MainView/>
    </StylesProvider>
  );
}

export default App;
