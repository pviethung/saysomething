interface UserMetadata {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  name: string;
}

interface User {
  id: string;
  user_metadata: UserMetadata;
}

export type { User, UserMetadata };
