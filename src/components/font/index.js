import { Global } from "@emotion/react";

// This component is used by chakar-ui
const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'IRANSansX-Normal';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/IRANSansX-Regular.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'IRANSansX-Bold';
        font-style: bold;
        font-weight: 500;
        font-display: swap;
        src: url('/fonts/IRANSansX-Bold.woff') format('woff');
      }
      `}
  />
);

export default Fonts;
