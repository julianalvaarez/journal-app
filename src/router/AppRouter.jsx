import { Navigate, Route, Router, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui/components";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth()

  if (status === "Checking") {
    return <CheckingAuth />;
  }
  return (
    <>
      <Routes>
        {
          status === "authenticated"
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path="/*" element={<Navigate to='/auth/login' />} />
      </Routes>
    </>
  );
};
