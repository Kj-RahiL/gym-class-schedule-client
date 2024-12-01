import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUserLogin = {
  id: string;
  name:string;
  email: string;
  role: string;
  status: string;
  iat: number;
  exp: number;
};