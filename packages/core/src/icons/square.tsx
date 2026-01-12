import { type IconProps, SvgWrapper } from "./common";

export function Square(props: IconProps) {
  return (
    <SvgWrapper {...props}>
      <path d="M4 20V4h16v16z" fill="currentColor" />
    </SvgWrapper>
  );
}
