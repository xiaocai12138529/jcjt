import type { IFileDes } from "../types";

export interface IEditEventParams {
  CONTENT: string;
  DEEDSTIME: string;
  Q_PGREATDEEDSFILES: IFileDes[];
}

export interface ISummaryModify {
  TITLE: string;
  CONTENT: string;
  PICTURE: string;
}
