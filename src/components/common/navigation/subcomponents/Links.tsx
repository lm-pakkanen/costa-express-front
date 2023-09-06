import React from "react";
import { NavLink } from "./NavInputs";
import IImage from "../../../../interfaces/IImage";
import inputStyles from "./NavInputs.module.css";
import useScrollStatus from "../../../../hooks/useScrollStatus";
import { getHref } from "../../../../helpers";

interface ILink {
  path: string;
  style?: string;
}

interface IBrand extends ILink {
  enableColorChangeOnScroll?: true;
}

const logoLight: IImage = {
  url: getHref("/img/Logo-light.svg").toString(),
  alt: "Etusivu",
  title: "CostaExpress etusivu",
};

const logoDark: IImage = {
  url: getHref("/img/Logo-dark.svg").toString(),
  alt: "Etusivu",
  title: "CostaExpress etusivu",
};

export const Brand: React.FC<IBrand> = (props) => {
  const isPageScrolled = useScrollStatus();

  let logo = logoDark;

  if (props.enableColorChangeOnScroll) {
    if (isPageScrolled) {
      logo = logoDark;
    } else {
      logo = logoLight;
    }
  }

  return (
    <NavLink
      id={"navHomeLink"}
      href={getHref("/")}
      text={"CostaExpress"}
      title={"Etusivu"}
      image={logo}
      style={inputStyles.NavLinkBrand}
    />
  );
};
