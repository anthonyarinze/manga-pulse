import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import Heading from "./Heading";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateLibrary } from "../hooks/useUpdateLibrary";
import { updateStatus } from "../slices/titleSlice";
import SpinnerMini from "./SpinnerMini";

const StyledModal = styled.div`
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  z-index: 1000;
  padding: 20px;
  position: fixed;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-100);
`;

const StyledBackdrop = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  transition: all 0.5s;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 170px;
  margin-top: 10px;
  object-fit: cover;
  border-radius: 4px;
`;

const StyledDropdown = styled.select`
  width: 100%;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: var(--color-grey-100);
`;

const StyledOption = styled.option`
  cursor: pointer;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  margin-top: 20px;
  border-radius: 4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.as === "update" &&
    css`
      background-color: #ff6740;
    `}

  ${(props) =>
    props.as === "cancel" &&
    css`
      background-color: rgb(79, 79, 79);
    `}

      &:hover {
    filter: brightness(90%);
  }
`;

const Modal = ({ handleBackdropClick }) => {
  const [status, setStatus] = useState("None");
  const { type } = useParams();
  const dispatch = useDispatch();
  const titleDetails = useSelector((state) => state.title);

  const { webpImage } = titleDetails;
  const { update, isLoading } = useUpdateLibrary();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = () => {
    update(titleDetails);
  };

  const mangaOptions = [
    "None",
    "Reading",
    "On Hold",
    "Dropped",
    "Plan to Read",
    "Completed",
  ];

  const animeOptions = [
    "None",
    "Watching",
    "On Hold",
    "Dropped",
    "Plan to Watch",
    "Completed",
  ];

  useEffect(() => {
    dispatch(updateStatus(status));
  }, [dispatch, status]);

  return createPortal(
    <StyledBackdrop>
      <StyledModal>
        <StyledHeader>
          <Heading as="h3">Add to library</Heading>
          <IoClose
            style={{ fontSize: "2.4rem", cursor: "pointer" }}
            onClick={handleBackdropClick}
          />
        </StyledHeader>
        <StyledImage src={webpImage} alt="img" />
        <Heading as="h3">Status:</Heading>
        <StyledDropdown value={status} onChange={handleStatusChange}>
          {type === "manga"
            ? mangaOptions.map((option, index) => (
                <StyledOption value={option} key={index}>
                  {option}
                </StyledOption>
              ))
            : animeOptions.map((option, index) => (
                <StyledOption value={option} key={index}>
                  {option}
                </StyledOption>
              ))}
        </StyledDropdown>
        <StyledButton as="update" onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Update"}
        </StyledButton>
        {isLoading ? (
          <></>
        ) : (
          <StyledButton
            as="cancel"
            onClick={handleBackdropClick}
            disabled={isLoading}
          >
            Cancel
          </StyledButton>
        )}
      </StyledModal>
    </StyledBackdrop>,
    document.body
  );
};

export default Modal;
