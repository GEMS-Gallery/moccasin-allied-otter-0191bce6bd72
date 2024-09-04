import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

interface CreatePostFormProps {
  onCreatePost: (title: string, body: string, author: string) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data: { title: string; body: string; author: string }) => {
    onCreatePost(data.title, data.body, data.author);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="space-y-4">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          defaultValue=""
          rules={{ required: 'Body is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          defaultValue=""
          rules={{ required: 'Author is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Author"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </Box>
    </form>
  );
};

export default CreatePostForm;
