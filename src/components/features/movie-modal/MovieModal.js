import Heading from "wombat/lib/components/heading/Heading";
import Hold from "wombat/lib/components/layout/Hold";
import Icon from "wombat/lib/components/icon/Icon";
import Loader from "wombat/lib/components/loader/Loader";
import Media from "wombat/lib/components/layout/Media";
import Modal from "wombat/lib/components/modal/Modal";
import Picture from "wombat/lib/components/picture/Picture";
import Space from "wombat/lib/components/space/Space";
import Stack from "wombat/lib/components/layout/Stack";

import { Users, AlertTriangle, Clock } from "react-feather";

import styles from "./MovieModal.module.css";

const MovieModal = ({
  id,
  title,
  releaseDate,
  imgSrc,
  length,
  contentRating,
  summary,
  castStars,
  trailer,
  isLoading,
  isError,
  isOpen,
  onClose = () => null,
}) => {
  // ===============================
  // console.log("trailer data");
  // console.log(trailer);
  // ===============================

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <section id={id} className={styles.root}>
        {isError && (
          <Hold>
            <div>SOMETHING WENT OOPS. HOLD YOUR POPCORN.</div>
          </Hold>
        )}

        {isLoading && (
          <Hold>
            <Loader />
          </Hold>
        )}

        {!isError && !isLoading && (
          <div className={styles.content}>
            <Space size="3" />

            <Heading level="3" as="h1" colorInherit mb="2">
              {title}
            </Heading>

            <Media
              align="start"
              start={
                <Picture
                  src={imgSrc}
                  alt={title}
                  width="12rem"
                  aspectRatio="3:4"
                  className={styles.image}
                />
              }
              space="1.5"
            >
              <div className={styles.date}>Release date: {releaseDate}</div>
              <article className={styles.summary}>{summary}</article>
            </Media>

            <Space size="2" />

            <Stack className={styles.details} space="0.5">
              {length && (
                <Media
                  start={
                    <Icon>
                      <Clock />
                    </Icon>
                  }
                >
                  Length: {length}
                </Media>
              )}

              {contentRating && (
                <Media
                  start={
                    <Icon>
                      <AlertTriangle />
                    </Icon>
                  }
                >
                  Content Rating: {contentRating}
                </Media>
              )}

              {castStars && (
                <Media
                  start={
                    <Icon>
                      <Users />
                    </Icon>
                  }
                >
                  Cast: {castStars}
                </Media>
              )}
            </Stack>
          </div>
        )}
      </section>
    </Modal>
  );
};

export { MovieModal };
