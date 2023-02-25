import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";

type Props = {
  setQuery: (query: string) => void;
  placeholder: string;
  fullWidth?: boolean;
  multiline?:boolean;
};

const StyledSearchBox = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

export const SearchBox = ({setQuery, placeholder, fullWidth, multiline}: Props) => {
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
        placeholder={placeholder}
        size="small"
        fullWidth={fullWidth}
        multiline={multiline}
        autoFocus
      />
      <IconButton type="submit" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </StyledSearchBox>
  );
};