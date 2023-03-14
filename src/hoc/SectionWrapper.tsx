import { motion } from "framer-motion";
import { ReactComponentElement } from "react";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

interface Props {
    Component: any,
    idName: any,
}

const SectionWrapper = ({Component, idName}: Props) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
