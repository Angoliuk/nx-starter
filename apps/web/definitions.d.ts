import React from "react";

declare module "*.svg" {
  const content: unknown;
  export const ReactComponent: unknown;
  export default content;
}

declare module "react" {
  function memo<T extends React.ComponentType<unknown>>(
    Component: T,
    propsAreEqual?: (prev: Readonly<React.ComponentProps<T>>, next: Readonly<React.ComponentProps<T>>) => boolean,
  ): T;

  function forwardRef<T, C extends React.ComponentType<unknown>>(
    render: ForwardRefRenderFunction<T, Readonly<React.ComponentProps<C>>>,
  ): ForwardRefExoticComponent<PropsWithoutRef<C> & RefAttributes<T>>;
}
