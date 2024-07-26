import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = ({ setOpen, admin }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, admin: boolean }) => {
  const location = usePathname();
  const items = [ "Services", "Contact"];

  return (
    <motion.div className="links" variants={variants}>
      <Link href='/' >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
          Home
          </motion.div>
        </Link>
        {admin && (
        <Link href="/admin">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
            Admin
          </motion.div>
        </Link>
      )}
      <Link href='/wrapup' >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
            Wrap Up
          </motion.div>
        </Link>
      {items.map((item) => (
        <Link href={`/${item.toLowerCase()}`} key={item}>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
          >
            {item}
          </motion.div>
        </Link>
      ))}

      
    </motion.div>
  );
};

export default Links;
