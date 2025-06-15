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
  name: string;
  shortName: string;
  nameSortKey: string;
  originalUrl: string;
  summary: string;
  profilePicture: string | null;
}
