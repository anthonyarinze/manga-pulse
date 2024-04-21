import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
  const { isLoading } = useUser();

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
};

export default ProtectedRoute;
