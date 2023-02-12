import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { Box } from '@mui/material';

const StyledSearchBox = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

export const SearchBox = () => {

  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('keyword'));
  }

  return (
    <StyledSearchBox>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="keyword"
          required
          name="keyword"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          variant="outlined"
          placeholder="単語を入力"
          size="small"
          autoFocus
        />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Box>
    </StyledSearchBox>
  );
};