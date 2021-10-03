import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import React from 'react';


interface IProps {
  name?: string,
  label?: string,
  onChange?(e: any): void,
  value: string,
}

function Search({ label = 'Search', ...props }: IProps) {
  return <FormControl variant="standard">
    <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
    <Input
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
      {...props}
    />
  </FormControl>
}

export default Search;
