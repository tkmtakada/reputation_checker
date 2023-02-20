import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

const StyledSearchBox = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

export const SearchBox = ({setQuery}: {setQuery: (query: string) => void}) => {
  const [ word, setWord ] = useState("");
  
  const handleSubmit = () => {
    setQuery(word);
  }

  return (
    <StyledSearchBox>
      <TextField
        required
        onChange={(e) => setWord(e.target.value)}
        variant="outlined"
        placeholder="単語を入力"
        size="small"
        autoFocus
      />
      <IconButton type="submit" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </StyledSearchBox>
  );
};