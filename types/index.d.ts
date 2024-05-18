export type TButtonVariants = "solid" | "ghost" | "outline";
export type TButtonColors = "primary" | "secondary";
export type TButtonSizes = "regular" | "small" | "large";

export type TPreloaderSizes = "regular" | "small" | "large";
export type TPanelComponet = {
  component: Component;
};
export type TPanelProps = {
  matchNumber?: number;
  tries?: number;
  shake?: boolean;
};
export type TPanelEvents = {
  getFinishedTime: () => void;
};

export type TLevel = "EASY" | "MEDIUM" | "HARD";
