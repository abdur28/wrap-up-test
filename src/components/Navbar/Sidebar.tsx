'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Links from "./Links";
import "./sidebar.scss";
import ToggleButton from "./ToggleButton";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(0px at 340px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = ({admin} = {admin: false}) => {
  const [open, setOpen] = useState(false);

  const clipPath = "circle(0px at 220px 50px)" // 220px is the width of the menu button

  variants.closed.clipPath = clipPath;

  return (
    <motion.div className="sidebar" animate={open ? "open" : "closed"} initial="closed">
      <motion.div className="bg" animate={open ? "open" : "closed"} variants={variants}>
        <Links admin={admin} setOpen={setOpen}/>
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

export default Sidebar;
