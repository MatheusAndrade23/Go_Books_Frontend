import { Text as TextStyles } from "./styles";

interface TextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Text = ({ children, style }: TextProps) => {
  return <TextStyles style={style}>{children}</TextStyles>;
};
