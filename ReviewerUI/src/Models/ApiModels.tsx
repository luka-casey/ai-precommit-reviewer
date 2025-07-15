import type { GptModel } from "../enums/GptModel";

export interface GitCommitFilePayload {
  inlineDiff: FilePayload;
  beforeContent: FilePayload;
  afterContent: FilePayload;
}

export interface CodeReviewRequest {
  Code: string
  GptModel: GptModel
  Comment: string
}

export interface FilePayload {
  body: string;
  beforeFileName?: string | null;
  afterFileName?: string | null;
}