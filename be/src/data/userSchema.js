const userSchema = {
    type: "object",
    properties: {
      id: {type:"string"},
      firstName: { type: "string" },
      lastName: { type: "string" },
      password: { type: "string" },
      email: {type:"string",format:"email"},
      nickname: {type:"string"},
    },
    required: ["firstName", "lastName","password","email", "nickname"],
    //additionalProperties: false,
  }
  
  export default userSchema;
  