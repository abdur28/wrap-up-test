import { motion } from "framer-motion";

const ExpandButton = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

  return (
    <div className="button-div">
      <button onClick={() => setOpen((prev) => !prev)} >
        <svg width="20" height="20" viewBox="0 0 23 23" className="svg">
          <motion.path
            strokeWidth="3"
            stroke="black"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.path
            strokeWidth="3"
            stroke="black"
            strokeLinecap="round"
            d="M 11 0 L 11.5 18.423"
            variants={{
              closed: { d: "M 11 0 L 11.5 18.423" },
              open: { d: "M 2 9.423 L 20 9.423" },
            }}          
          />
        </svg>
      </button>
    </div>
  );
};

export default ExpandButton;
