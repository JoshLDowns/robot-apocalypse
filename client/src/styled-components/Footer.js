import React from "react";
import styled from "@emotion/styled/macro";

import { OutboundLink, ClickableText } from "./Components";

const BottomDiv = styled("section")`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Footer = () => {
  return (
    <BottomDiv>
      <ClickableText>about/</ClickableText>
      <OutboundLink href="https://www.npmjs.com/package/text-adventure-robot-apocalypse">npm/</OutboundLink>
      <OutboundLink href="/">github/</OutboundLink>
      <OutboundLink href="https://www.joshdowns.dev">portfolio/</OutboundLink>
    </BottomDiv>
  )
}

export default Footer;