import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    const articleData = { title, img, content };
    console.log(articleData)

    try {
      const response = await axios.post('https://blogpy.onrender.com/articles', articleData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Article added successfully:', response.data);
      // Réinitialiser le formulaire
      setTitle('');
      setImg('');
      setContent('');
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Failed to add article. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Add Article
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#d3d3d3' }}
        >
          Add Article
        </Button>
      </Box>
    </Container>
  );
};

export default ArticleForm;
