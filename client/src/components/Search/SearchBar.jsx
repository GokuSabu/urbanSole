import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im';
import useGrab from '../useGrab';
import Image from 'react-bootstrap/Image';
import { AiTwotoneStar } from 'react-icons/ai';
import { useContext } from 'react';
import myContext from '../Context';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { srch, setSrch } = useContext(myContext);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      setSrch(searchInput);
      navigate('/search-results');
    }}

  return (
    <div className="search">
      <div className="input-group">
      <input
          type="text"
          className="form-control"
          placeholder="Search Products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ height: '40px', width: '30%',marginBottom:'15px',marginLeft:'5px' }}  // Inline styles for height and width
        />
        <div className="input-group-append">
          <button onClick={handleSearch} id="search_btn" className="btn"  style={{ fontSize: '20px', padding: '2px 10px' ,border:'none'}}>
            <ImSearch color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;