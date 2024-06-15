import styled from "styled-components";
import TitleButton from "../TitleButton";
import { MdBookmarkAdded } from "react-icons/md";
import { IoBookmarksOutline, IoShareOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { openModal } from "../../slices/modalSlice";
import { useUser } from "../../hooks/useUser";
import { handleShareButtonClick } from "../../utils/helpers";

const StyledButtons = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  height: fit-content;
`;

const StyledPopupButton = styled.button`
  padding: 8px;
  color: white;
  border-radius: 4px;
  background-color: var(--color-grey-200);
`;

const TitleButtons = ({ isInLibrary }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useUser();

  const handleAddToLibrary = () => {
    if (isAuthenticated) {
      dispatch(openModal());
    } else {
      toast.custom(
        <StyledPopupButton onClick={() => navigate("/auth")}>
          {" "}
          Please create an account to add titles to your library. Click here to
          create your account.
        </StyledPopupButton>
      );
    }
  };

  return (
    <StyledButtons>
      <TitleButton as="edit" onClick={() => handleAddToLibrary()}>
        {isInLibrary ? <MdBookmarkAdded /> : <IoBookmarksOutline />}
      </TitleButton>
      <TitleButton as="share" onClick={() => handleShareButtonClick()}>
        <IoShareOutline />
      </TitleButton>
    </StyledButtons>
  );
};

export default TitleButtons;
