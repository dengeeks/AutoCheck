import { Box, Button } from '@mui/material';
import { React, useState, useContext } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { UpdateUserInfo } from '../../api/AccountSettings/UpdateUserInfo';
import './AvatarUploader.css'
import AuthContext from '../../context/AuthContext';


const AvatarUpload = ({selectedImage, onClose}) => {
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const {authTokens, updateUser} = useContext(AuthContext)
  
  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleCropImage = () => {
    if (editor) {
      // Get the cropped image as a canvas
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        // Convert the canvas to a blob and create a new File object from the Blob and name it 'avatar.png'
        const file = new File([blob], 'avatar.png', { type: 'image/png' });
        
        // Create a new FormData object to send the file as a multipart/form-data
        const formData = new FormData();
        formData.append('avatar', file);
         
        // Send a PATCH request to update the user's avatar on the server
        UpdateUserInfo({avatar: file, token: authTokens.access, updateUser: updateUser})
      }, 'image/png', 1.0);
    }
  };
  
  return (
    <Box className='upload-avatar-content'>
        <Box>
            <AvatarEditor
                ref={(editorRef) => setEditor(editorRef)}
                image={selectedImage}
                border={0}
                borderRadius={125}
                scale={scale}
                className='avatar-editor'
            />
        </Box>
        <input
            // input scale slider
            type="range"
            min="1"
            max="5"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
            style={{ accentColor: '#498EDF', width: '100%', }}
        />
        <Box sx={{ marginTop: '10px' }}>
            <Button 
                onClick={handleCropImage}
                className='upload-avatar-btn'
            >
                Сохранить
            </Button>
            <Button
                onClick={onClose}
                className='cancel-avatar-btn'
            >
                Отмена
            </Button> 
        </Box>

    </Box>
  );
};

export default AvatarUpload;