import reducer, { saveFormData } from "../formSlice";

describe("formSlice", () => {
  const initialState = {
    formData: null,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle saveFormData", () => {
    const payload = { name: "John Doe", email: "john@example.com" };
    const action = saveFormData(payload);
    const expectedState = {
      formData: payload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should overwrite formData when saveFormData is called multiple times", () => {
    const initialPayload = { name: "John Doe", email: "john@example.com" };
    const action1 = saveFormData(initialPayload);
    const intermediateState = reducer(initialState, action1);

    const newPayload = { name: "Jane Doe", email: "jane@example.com" };
    const action2 = saveFormData(newPayload);
    const expectedState = {
      formData: newPayload,
    };

    expect(reducer(intermediateState, action2)).toEqual(expectedState);
  });
});
