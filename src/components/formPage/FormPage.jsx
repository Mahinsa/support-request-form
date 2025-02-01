import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { saveFormData } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { formSchema, issueTypes, tagsOptions } from "../../utils/schema";
import "./FormPage.css";

const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      issueType: "",
      tags: [],
      steps: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data) => {
    dispatch(saveFormData(data));
    navigate("/confirmation");
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box className="form-box">
        <Typography variant="h4" gutterBottom align="center">
          Support Request Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            select
            label="Issue Type"
            margin="normal"
            {...register("issueType")}
            error={!!errors.issueType}
            helperText={errors.issueType?.message}
          >
            {issueTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6">Tags</Typography>
          {tagsOptions.map((tag) => (
            <FormControlLabel
              key={tag}
              control={<Checkbox value={tag} {...register("tags")} />}
              label={tag}
            />
          ))}
          <Typography variant="h6" marginTop={2}>
            Steps to Reproduce
          </Typography>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center" gap={1}>
              <TextField
                fullWidth
                label={`Step ${index + 1}`}
                margin="normal"
                {...register(`steps.${index}`)}
                error={!!errors.steps?.[index]}
                helperText={errors.steps?.[index]?.message}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
          {errors.steps && (
            <Typography color="error">{errors.steps?.message}</Typography>
          )}
          <Button variant="outlined" onClick={() => append("")} sx={{ mt: 1 }}>
            Add Step
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default FormPage;
