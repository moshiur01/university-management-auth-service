export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: true | false | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
