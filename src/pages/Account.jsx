import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import RatioChart from "../ui/account/RatioChart";
import AccountDetails from "../ui/account/AccountDetails";

const StyledAccount = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: start;
`;

const Account = () => {
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!user)
    return (
      <Button
        style={{ width: "fit-content", margin: "10px" }}
        onClick={() => navigate("/auth", { replace: true })}
      >
        Log In/Sign up
      </Button>
    );

  return (
    <StyledAccount>
      {/* USER NAME & LOG OUT BUTTON */}
      <AccountDetails user={user} logout={logout} isLoggingOut={isLoggingOut} />
      {/* charts go here */}
      <RatioChart />
    </StyledAccount>
  );
};

export default Account;
