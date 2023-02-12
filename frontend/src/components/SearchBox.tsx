import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import { Box } from '@mui/material';
import axios from 'axios';

const StyledSearchBox = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

const StyledResult = styled.div`
  margin: 'auto';
  margin-top: 50px;
`;

export const SearchBox = () => {
  const [ word, setWord ] = useState("");
  const [ query, setQuery ] = useState("");
  const [ resultText, setResultText ] = useState("");

  useEffect(() => {
    const fetchData = () => {
      console.log("検索処理");
      console.log(query);

      axios
        .get(`http://localhost:8080/api/search?word=${query}`)
        .then(() => {
          setResultText(`「${query}」に対する世間の評判は...`);
        })
        .catch((err) => "");
    };
    if (query) fetchData();
  }, [query]);

  const handleSubmit = () => {
    setQuery(word);
    console.log(`検索ワード「${word}」`);
  }

  return (
    <>
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
      <StyledResult>
        {query ? `${resultText}` : ""}
      </StyledResult>
    </>
  );
};