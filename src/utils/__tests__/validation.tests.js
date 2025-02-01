import { formSchema } from "../schema";

describe("formSchema validation", () => {
  it("should validate a correct form", () => {
    const validData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "Bug",
      tags: ["urgent", "ui"],
      steps: ["Open the app", "Click the button", "See the error"],
    };

    expect(formSchema.safeParse(validData).success).toBe(true);
  });

  it("should require fullName", () => {
    const invalidData = {
      fullName: "",
      email: "john.doe@example.com",
      issueType: "Bug",
      tags: [],
      steps: ["Open the app"],
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0]).toEqual(
      expect.objectContaining({
        message: "Full Name is required",
        path: ["fullName"],
      })
    );
  });

  it("should validate email format", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "invalid-email",
      issueType: "Bug",
      tags: [],
      steps: ["Open the app"],
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0]).toEqual(
      expect.objectContaining({
        message: "Invalid email address",
        path: ["email"],
      })
    );
  });

  it("should require issueType", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "",
      tags: [],
      steps: ["Open the app"],
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0]).toEqual(
      expect.objectContaining({
        message: "Issue Type is required",
        path: ["issueType"],
      })
    );
  });

  it("should validate that steps cannot be empty", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "Bug",
      tags: [],
      steps: ["", ""],
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Step cannot be empty",
          path: ["steps", 0],
        }),
      ])
    );
  });

  it("should require at least one step", () => {
    const invalidData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "Bug",
      tags: [],
      steps: [],
    };

    const result = formSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0]).toEqual(
      expect.objectContaining({
        message: "At least one step is required",
        path: ["steps"],
      })
    );
  });

  it("should allow tags to be an empty array", () => {
    const validData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      issueType: "Bug",
      tags: [],
      steps: ["Open the app"],
    };

    expect(formSchema.safeParse(validData).success).toBe(true);
  });
});
