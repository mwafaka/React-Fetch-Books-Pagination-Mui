import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';


import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=${currentPage}`);
        setBooks(response.data.docs);

        setTotalPages(Math.ceil(response.data.numFound / 10));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [query, currentPage]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); 
    
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Book Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
      <ul style={{display:'flex',width:'100%',flexWrap:'wrap'}} >
        {books.map(book => (
      <div key={book.title}>
    <Card sx={{ maxWidth: 300,m:5,height:400}} >
    <CardMedia 
      sx={{ width: '300px' }}
        component="img"
        height="194"
      
        image= {book.cover_i ?`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null}
        alt="Paella dish"
      />
      <CardHeader
      
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={book.title}
        subheader={book.author_name ? book.author_name.join(', ') : 'Unknown'}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {book.time_facet}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
   
      </CardActions>
     
    </Card>
</div>         
        ))}
      </ul>
      <div>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next Page</button>
      </div>
    </div>
  );
};

export default BookSearch;







