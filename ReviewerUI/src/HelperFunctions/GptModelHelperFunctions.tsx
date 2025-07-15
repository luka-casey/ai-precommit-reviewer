import { GptModel } from "../enums/GptModel";

export function stringToGptModel(value: string): GptModel {
  switch (value) {
    case "gpt-3.5-turbo":
      return GptModel.Gpt35Turbo;
    case "gpt-4o-mini":
      return GptModel.Gpt4OMini;
    default:
      throw new Error("Unknown GPT model string");
  }
}

export function gptModelToString(model: GptModel): string {
  switch (model) {
    case GptModel.Gpt35Turbo:
      return "gpt-3.5-turbo";
    case GptModel.Gpt4OMini:
      return "gpt-4o-mini";
    default:
      throw new Error("Unknown GPT model");
  }
}
