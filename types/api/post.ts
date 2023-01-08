export type GetPost = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  image: {
    url: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    uid: string;
    icon: {
      url: string;
    };
  };
};

export type EditPostType = {
  id: number;
  title: string;
  content: string;
  image: string;
};
