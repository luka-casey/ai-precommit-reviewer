import { type FilePayload } from "./FilePayload";

export interface GitCommitFilePayload {
  inlineDiff: FilePayload;
  beforeContent: FilePayload;
  afterContent: FilePayload;
}