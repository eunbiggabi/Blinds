// src/pages/BlogPage.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Moon, Sun } from "lucide-react";
import { blogArticles } from "../components/BlogArticles";

const categories = ["All", "Choosing", "Care", "Trends", "Office", "Rental", "Self-Install"];
const ARTICLES_PER_PAGE = 6;

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 & 검색
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" ||
        article.title.toLowerCase().includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const goToPage = (num) => setCurrentPage(num);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}>
      <div className="w-full max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-0">
            Home & Blinds Insights Blog
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedArticles.map((article) => (
            <motion.div
              key={article.key}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-all hover:shadow-3xl"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="p-8 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h3>
                <p className="line-clamp-6 mb-4">{article.content.replace(/\n/g, " ")}</p>
                <div className="mt-auto text-sm italic text-gray-500 dark:text-gray-400">
                  Click to read full article
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10 relative"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-6 right-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <X size={32} />
                </button>

                <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
                  {selectedArticle.title}
                </h3>

                {selectedArticle.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                    {paragraph}
                  </p>
                ))}

                <hr className="my-8 border-gray-200 dark:border-gray-700" />
                <p className="text-sm italic text-center text-gray-500 dark:text-gray-400">
                  End of Article
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogPage;
