import "./content.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Content({ _id, name, type, images = [] }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="details"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="sub-content">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {name}
        </motion.h1>
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {type}
        </motion.span>

        <motion.div
          className="images-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {images.length > 0 ? (
            <motion.img
              src={images[0]} 
              alt={`${name} image`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          ) : (
            <img src="./views/image.png" alt="Default" />
          )}
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <button onClick={() => navigate(`/details/${_id}`)}>
          More Details
        </button>
      </motion.div>
    </motion.div>
  );
}
