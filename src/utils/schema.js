import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  issueType: z.string().min(1, "Issue Type is required"),
  tags: z.array(z.string()),
  steps: z
    .array(z.string().min(1, "Step cannot be empty"))
    .min(1, "At least one step is required"),
});

export const issueTypes = ["Bug Report", "Feature Request", "General Inquiry"];

export const tagsOptions = ["UI", "Backend", "Performance"];
