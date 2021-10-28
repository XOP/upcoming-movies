import Panel from "choom/lib/components/panel/Panel";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Panel
      as="footer"
      padding="1.5"
      className={styles.root}
      position="static"
      placement="bottom"
    >
      <div className={styles.content}>
        Prototype application "Coming Up Next..." <br />
        is powered by{" "}
        <a href="https://rapidapi.com/SAdrian/api/data-imdb1">
          Data-Imdb
        </a> and <a href="https://imdb-api.com/">IMDb-API</a>
        <br />
        Keeping track of releases since November 2021 | <a href="https://github.com/XOP/upcoming-movies">XOP</a>, 2021
      </div>
    </Panel>
  );
};

export { Footer };
