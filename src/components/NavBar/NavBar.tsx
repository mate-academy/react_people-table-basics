import React, { memo } from "react";
import { FC } from "react";
import { PageNavLink } from "../PageNavLink/PageNavLink";

export const NavBar: FC = memo(() => (
  <div className="navbar-brand">
    <PageNavLink to="/" text="Home"/>
    <PageNavLink to="/people" text="People"/>
  </div>
))
