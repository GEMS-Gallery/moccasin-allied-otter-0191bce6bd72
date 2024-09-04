import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Grid container spacing={3} className="mt-4">
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id.toString()}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By {post.author.toString()} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
              </Typography>
              <Typography variant="body1">{post.body}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
