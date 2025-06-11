export type Item = {
  id: string;
  name: string;
  description: string;
  claimedBy?: string;
  isBought: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  groups: string[];
};

export type Group = {
  id: string;
  name: string;
  members: User[];
  items: Item[];
};

export type SuperAdmin = {
  id: string;
  name: string;
  email: string;
};