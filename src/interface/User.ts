export interface UserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  name: string;
}

export interface User {
  id: string;
  user_metadata: UserMetadata;
}
