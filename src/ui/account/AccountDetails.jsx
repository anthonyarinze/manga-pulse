import { MdAccountCircle, MdLogout } from "react-icons/md";
import styled from "styled-components";
import SpinnerMini from "../SpinnerMini";

const StyledUserCard = styled.div`
  width: 40%;
  height: 68px;
  cursor: auto;
  display: flex;
  font-size: 2rem;
  padding-left: 10px;
  border-radius: 5px;
  align-items: center;
  box-shadow: var(--shadow-md);
  justify-content: space-between;
  background-color: var(--color-grey-100);
`;

const StyledName = styled.p`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div`
  padding: 8px;
  display: flex;
  margin-right: 5px;
  border-radius: 5px;
  align-self: center;

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-300);
  }
`;

const AccountDetails = ({ user, logout, isLoggingOut }) => {
  const fullName = user?.user_metadata.fullName;
  return (
    <StyledUserCard>
      <StyledName>
        <MdAccountCircle />
        {fullName}
      </StyledName>
      <StyledIcon onClick={() => logout()}>
        {isLoggingOut ? <SpinnerMini /> : <MdLogout />}
      </StyledIcon>
    </StyledUserCard>
  );
};

export default AccountDetails;
