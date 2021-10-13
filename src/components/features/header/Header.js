import Panel from "choom/lib/components/panel/Panel";
import Heading from "choom/lib/components/heading/Heading";
import Media from "choom/lib/components/layout/Media";

import logoSrc from "../../../assets/images/coming_up.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <Panel as="header" padding="1.5" className={styles.root} placement="top">
      <Media
        align='center'
        start={
          <img src={logoSrc} className={styles.logo} alt="Coming up next logo" /> 
        }
      >
        <Heading level="4" as="h1" colorInherit>
          Coming up next...
        </Heading>
      </Media>
    </Panel>
  );
};

export { Header };
