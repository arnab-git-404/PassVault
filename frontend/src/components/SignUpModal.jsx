import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1.1, y: -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            exit={{ scale: 0.5, y: 100, opacity: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-[80%] max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute hover:cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {children}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function SignUpModal({ isOpen, onClose }) {
  
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Open Modal Button */}

      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Open Modal
      </button> */}

      {/* Animated Modal */}

      <Modal isOpen={isOpen} onClose={onClose} >

        <p className="text-center text-2xl text-black font-bold mt-2">
          Secure Your Passwords with Ease!🔥
        </p>
        <p className="text-center text-md text-gray-700 mt-2">
          ✨ Sign up now to save and manage your passwords securely. 🔒
        </p>
        
        <div className="flex justify-center mt-4 ">
          <button className=" px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
            <Link to={"/signup"} className="font-bold">
              Sign Up ✍️
            </Link>
          </button>
        </div>

      </Modal>
    </div>
  );
}
