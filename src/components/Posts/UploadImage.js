import React from "react";
import styled from "styled-components";

const ImagePreview = styled.img`
  max-width: 30%;
`;
const ErrorParagraph = styled.p`
  color: #ff0000;
`;
const UploadImage = props => {
  return (
    <div>
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={props.handleImageChange}
        />
      </form>
      <ImagePreview src={props.imageUrl} />
      <div>
        <ErrorParagraph>{props.error}</ErrorParagraph>
      </div>
    </div>
  );
};

export default UploadImage;
