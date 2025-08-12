import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="app-heading"
      >
        <FaRobot className="robot-icon" /> Review Your Code with AI
        <br />
        <span className="tagline">
          <span>Instantly.</span> <span>Smartly.</span> <span>Stylishly.</span>
        </span>
      </motion.h1>

      {/* Mode Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </motion.button>

      {/* Main content */}
      <main>
        <motion.div
          className="left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={14}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
              }}
            />
          </div>

          <motion.div
            onClick={reviewCode}
            className="review"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Review 🚀
          </motion.div>
        </motion.div>

        <motion.div
          className="right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default App;
