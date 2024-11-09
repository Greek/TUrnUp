export interface Org_Involved {
  id: string | number;
  name: string;
  shortName: string;
  nameSortKey: string;
  websiteKey: string;
  summary: string;
  profilePicture: string;
}
export interface OrgResult {
  name: any;
  shortName: any;
  nameSortKey: any;
  originalUrl: string;
  summary: any;
  profilePicture: string | null;
}

