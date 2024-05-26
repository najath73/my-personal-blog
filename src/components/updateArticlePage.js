import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Container,Typography } from '@mui/material';

const UpdateArticlePage = () => {
  const { id } = useParams(); 
  const [articleData, setArticleData] = useState({
    title: '',
    img: '',
    content: ''
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`https://blogpy.onrender.com/articles/${id}`);
        const { title, img, content } = response.data; 
        setArticleData({ title, img, content });
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchArticleData();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.patch(`https://blogpy.onrender.com/articles/${id}`, articleData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log('Article updated successfully');
      
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <Container maxWidth="sm">
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate();
      }}
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
        Update Article
      </Typography>
      <TextField
        name="title"
        label="Title"
        value={articleData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="img"
        label="Image URL"
        value={articleData.img}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="content"
        label="Content"
        value={articleData.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        required
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, backgroundColor: '#d3d3d3', color: '#000' }}
      >
        Update
      </Button>
    </Box>
  </Container>
  );
};

export default UpdateArticlePage;
