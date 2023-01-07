export type NewUserType = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormType = Omit<NewUserType, "name">;
