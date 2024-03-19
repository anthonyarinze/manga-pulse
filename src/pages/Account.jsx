import styled from "styled-components";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";
import { useLogout } from "../hooks/useLogout";
import SpinnerMini from "../ui/SpinnerMini";

const StyledAccount = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: start;
`;

const StyledUserCard = styled.div`
  gap: 10px;
  width: 80%;
  height: 68px;
  cursor: auto;
  display: flex;
  padding-left: 10px;
  border-radius: 5px;
  font-size: x-large;
  align-items: center;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-100);
`;

const StyledAuthDiv = styled.div`
  display: flex;
  font-size: 3.5rem;
  align-items: center;
  justify-content: space-between;
`;

const StyledIcon = styled.div`
  padding: 8px;
  display: flex;
  border-radius: 5px;
  align-self: center;

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-100);
  }
`;

const Account = () => {
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <StyledAccount>
      <StyledAuthDiv>
        <StyledUserCard>
          <MdAccountCircle />
          <p>{user?.user_metadata.fullName}</p>
        </StyledUserCard>
        <StyledIcon onClick={logout}>
          {isLoggingOut ? <SpinnerMini /> : <MdLogout />}
        </StyledIcon>
      </StyledAuthDiv>
    </StyledAccount>
  );
};

export default Account;
