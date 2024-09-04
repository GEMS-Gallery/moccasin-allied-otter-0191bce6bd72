import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

interface CreatePostFormProps {
  onCreatePost: (title: string, body: string) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost }) => {
  const { control, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { title: string; body: string }) => {
    setIsSubmitting(true);
    try {
      await onCreatePost(data.title, data.body);
      reset();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Post'}
        </Button>
      </Box>
    </form>
  );
};

export default CreatePostForm;
