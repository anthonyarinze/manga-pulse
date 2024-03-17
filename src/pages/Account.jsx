import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";

const StyledAccount = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12px;
  justify-content: start;
`;

const StyledUserCard = styled.div`
  gap: 10px;
  width: 80%;
  height: 68px;
  display: flex;
  padding-left: 10px;
  border-radius: 5px;
  font-size: x-large;
  align-items: center;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-100);
`;

const Account = () => {
  const { isLoading, user } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <StyledAccount>
      <StyledUserCard>
        <MdAccountCircle />
        <p>{user?.user_metadata.fullName}</p>
      </StyledUserCard>
    </StyledAccount>
  );
};

export default Account;
