type TweetUser = {
  name: string;
  screenName: string;
  profileImageURL: string;
};

export type Tweet = {
  createdAt: Date;
  text: string;
  user: TweetUser;
  id: number;
};
