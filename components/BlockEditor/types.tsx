import type { Language } from "@/extensions/Ai";

import { ColorRadioItemProps } from "@/components/panels/Colorpicker/ColorRadioItem";

export type EditorUser = {
  clientId: string;
  name: string;
  color: ColorRadioItemProps["color"];
  initials?: string;
};

export type LanguageOption = {
  name: string;
  label: string;
  value: Language;
};

export type AiTone =
  | "academic"
  | "business"
  | "casual"
  | "childfriendly"
  | "conversational"
  | "emotional"
  | "humorous"
  | "informative"
  | "inspirational"
  | string;

export type AiPromptType = "SHORTEN" | "EXTEND" | "SIMPLIFY" | "TONE";

export type AiToneOption = {
  name: string;
  label: string;
  value: AiTone;
};

export type AiImageStyle = {
  name: string;
  label: string;
  value: string;
};
