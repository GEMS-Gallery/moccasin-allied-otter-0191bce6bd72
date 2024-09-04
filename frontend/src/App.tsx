import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, AppBar, Toolbar } from '@mui/material';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleCreatePost = async (title: string, body: string, author: string) => {
    try {
      await backend.createPost(title, body, author);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-500">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Crypto Blog</Typography>
        </Toolbar>
      </AppBar>
      <Box
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1642239817349-3e1cf98817a5?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0NTExNjF8&ixlib=rb-4.0.3)' }}
      >
        <Typography variant="h2" className="text-white text-shadow">
          Welcome to Crypto Blog
        </Typography>
      </Box>
      <Container className="mt-8">
        <CreatePostForm onCreatePost={handleCreatePost} />
        {loading ? (
          <Box className="flex justify-center mt-8">
            <CircularProgress />
          </Box>
        ) : (
          <PostList posts={posts} />
        )}
      </Container>
    </div>
  );
}

export default App;
