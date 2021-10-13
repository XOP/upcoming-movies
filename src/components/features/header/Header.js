import Panel from "wombat/lib/components/panel/Panel";
import Heading from "wombat/lib/components/heading/Heading";
import Icon from "wombat/lib/components/icon/Icon";
import Media from "wombat/lib/components/layout/Media";

import { Video } from "react-feather";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <Panel as="header" padding="1.5" className={styles.root} placement="top">
      <Media
        start={
          <Icon size="big">
            <Video />
          </Icon>
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
