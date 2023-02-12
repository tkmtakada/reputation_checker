import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SearchBox } from './components/SearchBox';

// import styled from 'styled-components';

/*
const StyledContainer = styled.div`
  background-color: 'red';
`; 
*/

const containerCSS = {
  // backgroundColor: 'gray',
  width: '700px',
  margin: 'auto',
}

function App() {
  return (
    <div style={containerCSS}>
      <SearchBox />
    </div>
  );
}

export default App;
