import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import Link from "next/link";
import Burger from "./Burger";
import CollapseMenu from "./CollapseMenu";

export default function Navbar(props) {
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)",
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          {!props.home && (
            <Link href="/">
              <Logo src="/images/profile.jpg" />
            </Link>
          )}
          <a /> {/* Space out flexbox */}
          <NavLinks style={linkAnimation}>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </NavLinks>
          <BurgerWrapper>
            <Burger />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>

      <CollapseMenu />
    </>
  );
}

const NavBar = styled(animated.nav)`
  position: relative;
  width: 100%;
  background: white;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  margin: auto;
  padding: 0.5em 2rem;
  justify-content: space-between;
  height: 5rem;
`;

const Logo = styled.img`
  justify-self: start;
  display: flex;
  border-radius: 50%;
  max-height: 100%;
  cursor: pointer;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #a0a0a0;

    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;
