import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar } from "@mui/material";
import { upsertUserProfilePicture } from "@/services/userService";
import { useAuth } from "@/contexts/authContext";

const ProfilePhotoUploader = ({ imageUrl, userName }) => {
  //context
  const { user } = useAuth();
  //state
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      upsertUserProfilePicture({
        userId: user?.id,
        profilePicture: base64String,
      }).then((res) => {
        setImageSrc(res.data + "?" + Math.random());
      });
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <Avatar
          src={process.env.NEXT_PUBLIC_BASEIMAGEURL + imageSrc}
          alt={userName}
          sx={{ width: 100, height: 100, marginRight: 4 }}
        />
      </div>
    </div>
  );
};

const dropzoneStyle = {
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  marginTop: "20px",
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
};

export default ProfilePhotoUploader;
