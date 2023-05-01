interface Auth {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export type { Auth };
