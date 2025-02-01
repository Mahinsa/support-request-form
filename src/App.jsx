import { Routes, Route } from "react-router-dom";
import FormPage from "./components/formPage/FormPage";
import ConfirmationPage from "./components/confirmationPage/ConfirmationPage";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Support Request</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} disableGutters>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
