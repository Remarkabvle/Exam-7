import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField, Rating } from '@mui/material';
import './ReviewForm.scss';

const ModalReview = ({ open, handleClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null); // Store file for upload

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file); // Store the file for uploading
      setProfileImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = () => {
    if (rating && comment && name) {
      onSubmit({ rating, comment, name, profileImage });
      handleClose();
      // Reset fields after submission
      setRating(0);
      setComment('');
      setName('');
      setProfileImage(null);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-review">
        <Typography variant="h6" component="h2">
          Write a Review
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Box className="profile-image-upload">
          <Typography component="p">Upload Profile Image</Typography>
          <input type="file" onChange={handleImageChange} />
          {profileImage && <img src={profileImage} alt="Profile" />}
        </Box>
        <Button 
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalReview;
