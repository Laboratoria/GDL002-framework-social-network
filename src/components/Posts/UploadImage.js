import React from "react";
import styled from "styled-components";

const ImagePreview = styled.img`
  max-width: 30%;
`;
const ErrorParagraph = styled.p`
  color: #ff0000;
`;
const HideInput = styled.input`
  display: none;
`;
const UploadImage = props => {
  return (
    <div>
      <form>
        <button
          type={"button"}
          onClick={() => {
            document.getElementById("uploadFile").click();
          }}
        >
          {props.buttonLabel}
        </button>
        <HideInput
          id={"uploadFile"}
          type="file"
          accept="image/*"
          onChange={props.handleImage}
        />
      </form>
      <ImagePreview src={props.imageUrl} />
      <div>
        <ErrorParagraph>{props.error}</ErrorParagraph>
      </div>
    </div>
  );
};

const UploadImageEdited = props => {
  return (
    <div>
      <form>
        <button
          type={"button"}
          onClick={() => {
            document.getElementById("uploadFileEdited").click();
          }}
        >
          {props.buttonLabel}
        </button>
        <HideInput
          id={"uploadFileEdited"}
          type="file"
          accept="image/*"
          onChange={props.handleImageEdit}
        />
      </form>
      <ImagePreview src={props.imageUrl} />
      <div>
        <ErrorParagraph>{props.error}</ErrorParagraph>
      </div>
    </div>
  );
};

export { UploadImage, UploadImageEdited };
