export type NewUserType = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormType = Omit<NewUserType, "name">;

export type EditUserType = Omit<
  NewUserType & { icon: string; uid: string },
  "password"
>;
