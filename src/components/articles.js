import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Articles = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
        const reponseArticles = await axios.get('https://blogpy.onrender.com/articles');
        setArticlesData(reponseArticles.data.articles);

        const userIds = reponseArticles.data.articles.map(article => article.user_id);
        const usersResponses = await Promise.all(userIds.map(id => axios.get(`https://blogpy.onrender.com/users/${id}`)));
        const users = usersResponses.reduce((acc, res) => ({ ...acc, [res.data.id]: res.data }), {});
        setUsersData(users);

        console.log(reponseArticles.data.articles);
      } catch (erreur) {
        console.error('Erreur lors du chargement des données :', erreur);
      }
    };

    chargerDonnees();
  }, []);

  const handleExpandClick = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  const truncateContent = (content) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`https://blogpy.onrender.com/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      // Supprimer l'article de l'état local
      setArticlesData(articlesData.filter((article) => article.id !== id));
      console.log('Article deleted successfully');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Grid container spacing={4}>
        {articlesData.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ mx: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={article.img}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expandedArticle === index
                    ? article.content
                    : truncateContent(article.content)}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {usersData[article.user_id]?.username || article.user_id}
                </Typography>
                <Button size="small" onClick={() => handleDelete(article.id)}>
                  Delete
                </Button>
                <Link to={`/articles/update/${article.id}`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Link to={`/articles/${article.id}`}>
                  <Button size="small">View Full Article</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Articles;
