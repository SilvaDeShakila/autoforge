import type React from "react";

// React 19 exposes JSX types through React.JSX. This compatibility bridge keeps
// editors and tools that still read the global JSX namespace working correctly.
declare global {
  namespace JSX {
    type Element = React.JSX.Element;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}

export {};
