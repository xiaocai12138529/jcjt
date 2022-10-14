export interface ILoginObj {
  username: string;
  password: string;
  checkcode: string;
  projectid: number;
  sessioncode: string;
  phonecode: string;
}

export interface ILoginRes {
  userid: number;
  username: string;
  loginname: string;
  mainpage: string;
  token: string;
  projectid: number;
  loginsum: number;
  phonecode: string;
}
