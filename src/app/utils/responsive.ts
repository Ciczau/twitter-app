export interface BreakPoints {
  mobile: number;
  tablet: number;
  tabletLandscape: number;
  desktop: number;
  bigDesktop: number;
}

export const breakpoints: BreakPoints = {
  mobile: 420,
  tablet: 760,
  tabletLandscape: 1024,
  desktop: 1600,
  bigDesktop: 1921,
};

const customMediaQuery: (minWidth: number) => string = (minWidth: number) =>
  `@media only screen and (min-width: ${minWidth}px)`;

export const media = {
  custom: customMediaQuery,
  mobile: customMediaQuery(breakpoints.mobile),
  tablet: customMediaQuery(breakpoints.tablet),
  tabletLandscape: customMediaQuery(breakpoints.tabletLandscape),
  desktop: customMediaQuery(breakpoints.desktop),
  bigDesktop: customMediaQuery(breakpoints.bigDesktop),
};

export const portrait = "@media (orientation: portrait)";
export const landscape = "@media (orientation: landscape)";

export default media;
