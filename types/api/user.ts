export type GetUser = {
  id: number;
  name: string;
  email: string;
  uid: string;
  icon: {
    url: string;
  };
  posts?: [
    {
      id: number;
      title: string;
      content: string;
      user_id: number;
      image: {
        url: string;
      };
    }
  ];
};

export type LoginUserType = GetUser | null;
