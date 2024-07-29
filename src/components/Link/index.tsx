import { Link as MaterialLink } from "@mui/material";

interface LinkProps {
  children: React.ReactNode;
  href: string;
  style?: React.CSSProperties;
}

export const Link = ({ children, href, style }: LinkProps) => {
  return (
    <MaterialLink style={{ fontSize: "1.5rem", ...style }} href={href}>
      {children}
    </MaterialLink>
  );
};
