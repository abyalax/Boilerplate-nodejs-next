import { ComponentProps, CSSProperties, FC, PropsWithChildren } from 'react';

export interface FlexProps extends PropsWithChildren<ComponentProps<'div'>> {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
}

export const Flex: FC<FlexProps> = ({ gap = 2, justify, direction, wrap, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        gap,
        justifyContent: justify,
        flexDirection: direction,
        flexWrap: wrap,
        ...props.style,
      }}
    />
  );
};
