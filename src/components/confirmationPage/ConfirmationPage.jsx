import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const formData = useSelector((state) => state.form.formData);
  const navigate = useNavigate();

  if (!formData) {
    return (
      <Typography variant="h6" color="error">
        No form data available. Please submit the form first.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" className="container">
      <Box className="confirmation-box">
        <Typography variant="h4" gutterBottom align="center">
          Confirmation
        </Typography>
        <Typography>
          <strong>Full Name:</strong> {formData.fullName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {formData.email}
        </Typography>
        <Typography>
          <strong>Issue Type:</strong> {formData.issueType}
        </Typography>
        {formData.tags.length > 0 && (
          <Typography>
            <strong>Tags:</strong> {formData.tags.join(", ")}
          </Typography>
        )}
        <Typography variant="h6" className="steps-title">
          Steps to Reproduce:
        </Typography>
        <List>
          {formData.steps.map((step, index) => (
            <ListItem key={index}>
              {index + 1}. {step}
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
