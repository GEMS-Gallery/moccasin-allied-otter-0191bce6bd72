import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, AppBar, Toolbar, Button } from '@mui/material';
import { AuthClient } from '@dfinity/auth-client';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const initAuth = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    const authenticated = await client.isAuthenticated();
    setIsAuthenticated(authenticated);
  };

  const login = async () => {
    if (authClient) {
      await authClient.login({
        identityProvider: 'https://identity.ic0.app/',
        onSuccess: () => setIsAuthenticated(true),
      });
    }
  };

  const logout = async () => {
    if (authClient) {
      await authClient.logout();
      setIsAuthenticated(false);
      setPosts([]);
    }
  };

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

  const handleCreatePost = async (title: string, body: string) => {
    try {
      await backend.createPost(title, body);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-500">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex-grow">Crypto Blog</Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={login}>Login</Button>
          )}
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
        {isAuthenticated ? (
          <>
            <CreatePostForm onCreatePost={handleCreatePost} />
            {loading ? (
              <Box className="flex justify-center mt-8">
                <CircularProgress />
              </Box>
            ) : (
              <PostList posts={posts} />
            )}
          </>
        ) : (
          <Typography variant="h5" className="text-center mt-8">
            Please login to view and create posts
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default App;
