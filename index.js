/**
 * Font Randomizer
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details.
 *
 * @author liuzhen932
 * @version 1.0.3
 * @license WTFPL
 */

(function () {
  "use strict";

  /**
   * Google Fonts to load dynamically
   * @type {string[]}
   * @constant
   */
  const googleFonts = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Oswald",
    "Source Sans Pro",
    "Raleway",
    "Poppins",
    "Nunito",
    "Ubuntu",
    "Playfair Display",
    "Merriweather",
    "Dancing Script",
    "Pacifico",
    "Lobster",
    "Indie Flower",
    "Shadows Into Light",
    "Amatic SC",
    "Caveat",
    "Kalam",
    "Permanent Marker",
    "Satisfy",
    "Great Vibes",
    "Abril Fatface",
    "Bebas Neue",
    "Fredoka One",
    "Righteous",
    "Bangers",
    "Creepster",
    "Orbitron",
    "Russo One",
    "Cinzel",
    "Cormorant Garamond",
    "Crimson Text",
    "Libre Baskerville",
    "Lora",
    "Vollkorn",
    "Alegreya",
    "Fira Sans",
    "IBM Plex Sans",
    "Inter",
    "Work Sans",
    "Rubik",
    "Quicksand",
    "Comfortaa",
    "Josefin Sans",
    "Oxygen",
    "Dosis",
    "Noto Sans",
    "Barlow",
  ];

  /**
   * Available font families for randomization (including external fonts)
   * @type {string[]}
   * @constant
   */
  const fonts = [
    // System fonts
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",
    "Trebuchet MS, sans-serif",
    "Palatino, serif",
    "Garamond, serif",
    "Bookman, serif",
    "Tahoma, sans-serif",
    "Lucida Console, monospace",
    "Arial Black, sans-serif",
    "Gill Sans, sans-serif",
    "Lucida Sans, sans-serif",
    "Century Gothic, sans-serif",
    "Franklin Gothic Medium, sans-serif",
    "Segoe UI, sans-serif",
    "Cambria, serif",
    "Calibri, sans-serif",
    "Consolas, monospace",
    "Monaco, monospace",
    "Optima, sans-serif",
    "Futura, sans-serif",
    "Avenir, sans-serif",
    "Helvetica Neue, sans-serif",
    "San Francisco, sans-serif",
    "Roboto, sans-serif",
    "Noto Sans, sans-serif",
    "System UI, sans-serif",
    "Apple Color Emoji, cursive",
    "Segoe UI Emoji, cursive",
    "Segoe UI Symbol, cursive",
    "Noto Color Emoji, cursive",
    "Lucida Grande, Lucida Sans Unicode, sans-serif",
    "Palatino Linotype, Book Antiqua, serif",
    "MS Sans Serif, sans-serif",
    "MS Serif, serif",

    // Google Fonts (will be loaded dynamically)
    ...googleFonts.map((font) => `'${font}', sans-serif`),

    // Creative font stacks
    "Baskerville, Times New Roman, serif",
    "Avenir Next, Avenir, sans-serif",
    "Didot, serif",
    "American Typewriter, serif",
    "Andale Mono, monospace",
    "Menlo, Consolas, monospace",
    "Source Code Pro, monospace",
    "SF Mono, Monaco, monospace",

    // Decorative and display fonts
    "Papyrus, fantasy",
    "Brush Script MT, cursive",
    "Lucida Handwriting, cursive",
    "Marker Felt, fantasy",
    "Zapfino, cursive",
    "Herculanum, fantasy",
    "Chalkduster, fantasy",
    "Trattatello, fantasy",

    // International fonts
    "Hiragino Sans, sans-serif",
    "Yu Gothic, sans-serif",
    "Malgun Gothic, sans-serif",
    "Microsoft YaHei, sans-serif",
    "PingFang SC, sans-serif",
    "Noto Sans CJK, sans-serif",
    "Source Han Sans, sans-serif",
  ];

  /**
   * Load Google Fonts dynamically
   */
  const loadGoogleFonts = () => {
    // Check if Google Fonts are already loaded
    if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
      Logger.warn("Google Fonts already loaded");
      return;
    }

    // Create Google Fonts URL
    const fontNames = googleFonts
      .map((font) => font.replace(/\s+/g, "+"))
      .join("|");
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontNames.replace(/\|/g, "&family=")}:wght@300;400;500;600;700&display=swap`;

    // Create and append link element
    const link = document.createElement("link");
    link.href = googleFontsUrl;
    link.rel = "stylesheet";
    link.type = "text/css";

    // Add loading event listener
    link.onload = () => {
      Logger.info(`Loaded ${googleFonts.length} Google Fonts`);
      // Trigger font re-randomization after fonts are loaded
      setTimeout(() => {
        if (window.FontRandomizer && window.FontRandomizer.reRandomize) {
          window.FontRandomizer.reRandomize();
        }
      }, 500);
    };

    link.onerror = () => {
      Logger.warn("Failed to load Google Fonts");
    };

    document.head.appendChild(link);
    Logger.info("Loading Google Fonts...");
  };

  /**
   * Preload additional font resources
   */
  const preloadFonts = () => {
    // Adobe Fonts (if available)
    if (typeof Typekit !== "undefined" || window.Typekit) {
      Logger.info("Adobe Fonts detected");
    }

    // Font Awesome (if available)
    if (
      document.querySelector('link[href*="fontawesome"]') ||
      document.querySelector('link[href*="font-awesome"]')
    ) {
      fonts.push("FontAwesome, sans-serif");
      Logger.info("FontAwesome detected and added");
    }

    // Check for locally installed fonts
    const testFonts = [
      "Helvetica Neue",
      "SF Pro Display",
      "Roboto",
      "Segoe UI",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica",
      "Arial",
    ];

    testFonts.forEach((font) => {
      if (isFontAvailable(font)) {
        const fontStack = `'${font}', sans-serif`;
        if (!fonts.includes(fontStack)) {
          fonts.push(fontStack);
        }
      }
    });
  };

  /**
   * Check if a font is available on the system
   * @param {string} fontName - Font name to check
   * @returns {boolean} True if font is available
   */
  const isFontAvailable = (fontName) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Test with a reference font
    context.font = "12px monospace";
    const referenceWidth = context.measureText("mmmmmmmmmmlli").width;

    // Test with the target font
    context.font = `12px '${fontName}', monospace`;
    const testWidth = context.measureText("mmmmmmmmmmlli").width;

    return testWidth !== referenceWidth;
  };

  /**
   * Logger with different levels
   * @namespace Logger
   */
  const Logger = {
    /** @type {number} Current log level */
    level: 3,

    /** @type {Object} Log levels */
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },

    /**
     * Set logging level
     * @param {number} level - Log level (0-3)
     */
    setLevel(level) {
      this.level = level;
    },

    /**
     * Log error message
     * @param {string} message - Error message
     * @param {...any} args - Additional arguments
     */
    error(message, ...args) {
      if (this.level >= this.levels.ERROR) {
        console.error(`❌ ${message}`, ...args);
      }
    },

    /**
     * Log warning message
     * @param {string} message - Warning message
     * @param {...any} args - Additional arguments
     */
    warn(message, ...args) {
      if (this.level >= this.levels.WARN) {
        console.warn(`⚠️ ${message}`, ...args);
      }
    },

    /**
     * Log info message
     * @param {string} message - Info message
     * @param {...any} args - Additional arguments
     */
    info(message, ...args) {
      if (this.level >= this.levels.INFO) {
        console.log(`ℹ️ ${message}`, ...args);
      }
    },

    /**
     * Log debug message
     * @param {string} message - Debug message
     * @param {...any} args - Additional arguments
     */
    debug(message, ...args) {
      if (this.level >= this.levels.DEBUG) {
        console.debug(`🔍 ${message}`, ...args);
      }
    },
  };

  /**
   * Generate random opacity value between 30% and 100%
   * @returns {string} Random opacity value as string
   */
  const getRandomOpacity = () => {
    const min = 0.3; // 30%
    const max = 1.0; // 100%
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  /**
   * HTML tags to exclude from font randomization
   * @type {Set<string>}
   * @constant
   */
  const excludedTags = new Set([
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEXTAREA",
    "INPUT",
    "SELECT",
    "OPTION",
    "BUTTON",
    "CODE",
    "PRE",
  ]);

  /**
   * CSS selectors to exclude from font randomization
   * @type {string[]}
   * @constant
   */
  const excludedSelectors = [
    ".no-font-randomize",
    "#no-font-randomize",
    "[data-no-randomize]",
  ];

  /**
   * Utility functions for font randomization
   * @namespace utils
   */
  const utils = {
    /**
     * Get random font from the fonts array
     * @returns {string} Random font family
     */
    getRandomFont: () => fonts[Math.floor(Math.random() * fonts.length)],

    /**
     * Get random opacity value
     * @returns {string} Random opacity value
     */
    getRandomOpacity: () => getRandomOpacity(),

    /**
     * Check if element should be excluded from randomization
     * @param {Element} element - DOM element to check
     * @returns {boolean} True if element should be excluded
     */
    shouldExclude: (element) => {
      if (excludedTags.has(element.tagName)) return true;
      return excludedSelectors.some((selector) => {
        try {
          return element.matches(selector);
        } catch (e) {
          Logger.debug(`Selector match error: ${e.message}`);
          return false;
        }
      });
    },

    /**
     * Check if node is a text node
     * @param {Node} node - DOM node to check
     * @returns {boolean} True if node is text node
     */
    isTextNode: (node) => node.nodeType === Node.TEXT_NODE,

    /**
     * Create styled character element
     * @param {string} char - Character to style
     * @returns {HTMLSpanElement} Styled span element
     */
    createStyledChar: (char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.fontFamily = utils.getRandomFont();
      span.style.opacity = utils.getRandomOpacity();
      span.style.display = "inline-block";
      span.style.transition = "all 0.3s ease";
      span.className = "font-randomized-char";

      // Add hover effects
      span.addEventListener("mouseenter", () => {
        span.style.transform = "scale(1.1)";
        span.style.textShadow = "2px 2px 4px rgba(0,0,0,0.3)";
      });

      span.addEventListener("mouseleave", () => {
        span.style.transform = "scale(1)";
        span.style.textShadow = "none";
      });

      return span;
    },
  };

  /**
   * Process text node and randomize fonts for each character
   * @param {Text} textNode - Text node to process
   */
  const processTextNode = (textNode) => {
    const parent = textNode.parentNode;
    if (!parent || utils.shouldExclude(parent)) return;

    const text = textNode.textContent;
    if (!text.trim()) return;

    const fragment = document.createDocumentFragment();

    // Create element for each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === " ") {
        fragment.appendChild(document.createTextNode(" "));
      } else if (char === "\n") {
        fragment.appendChild(document.createElement("br"));
      } else if (char.trim()) {
        fragment.appendChild(utils.createStyledChar(char));
      } else {
        fragment.appendChild(document.createTextNode(char));
      }
    }

    // Replace original text node
    parent.replaceChild(fragment, textNode);
  };

  /**
   * Traverse DOM tree and process text nodes
   * @param {Node} node - Starting node for traversal
   */
  const traverseDOM = (node) => {
    if (utils.isTextNode(node)) {
      processTextNode(node);
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (utils.shouldExclude(node)) return;

      // Collect all child nodes
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach((child) => traverseDOM(child));
    }
  };

  /**
   * Add global CSS styles for randomized characters
   */
  const addGlobalStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      .font-randomized-char {
        cursor: pointer;
        animation: fadeIn 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @media (max-width: 768px) {
        .font-randomized-char {
          font-size: 0.9em;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Main execution function for font randomization
   */
  const randomizeFonts = () => {
    Logger.info("Font randomization started");

    // Load external fonts
    loadGoogleFonts();
    preloadFonts();

    // Add global styles
    addGlobalStyles();

    // Process page content
    traverseDOM(document.body);

    Logger.info(
      `Font randomization completed with ${fonts.length} available fonts`,
    );

    /**
     * Re-randomize existing font-randomized characters
     * @global
     */
    window.reRandomizeFonts = () => {
      document.querySelectorAll(".font-randomized-char").forEach((char) => {
        char.style.fontFamily = utils.getRandomFont();
        char.style.opacity = utils.getRandomOpacity();
      });
      Logger.info("Fonts re-randomized");
    };
  };

  /**
   * MutationObserver for monitoring DOM changes
   * @type {MutationObserver}
   */
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE ||
          node.nodeType === Node.TEXT_NODE
        ) {
          // Delay processing to avoid frequent triggers
          setTimeout(() => traverseDOM(node), 100);
        }
      });
    });
  });

  /**
   * Start DOM mutation observer
   */
  const startObserver = () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

  // Initialize when page is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      randomizeFonts();
      startObserver();
    });
  } else {
    // Execute immediately if page is already loaded
    randomizeFonts();
    startObserver();
  }

  /**
   * Global interface for font randomization control
   * @namespace FontRandomizer
   * @global
   */
  window.FontRandomizer = {
    /**
     * Re-randomize all existing characters
     */
    reRandomize: () => {
      window.reRandomizeFonts && window.reRandomizeFonts();
    },

    /**
     * Stop the mutation observer
     */
    stop: () => {
      observer.disconnect();
      Logger.info("Observer stopped");
    },

    /**
     * Restart the mutation observer
     */
    restart: () => {
      startObserver();
      Logger.info("Observer restarted");
    },

    /**
     * Add custom fonts to the font list
     * @param {string[]} customFonts - Array of custom font families
     */
    addCustomFonts: (customFonts) => {
      customFonts.forEach((font) => {
        if (!fonts.includes(font)) {
          fonts.push(font);
        }
      });
      Logger.info(`Added ${customFonts.length} custom fonts`);
    },

    /**
     * Load additional Google Fonts
     * @param {string[]} fontNames - Array of Google Font names
     */
    loadGoogleFonts: (fontNames) => {
      const fontQuery = fontNames
        .map((font) => font.replace(/\s+/g, "+"))
        .join("&family=");
      const url = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@300;400;500;600;700&display=swap`;

      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      link.type = "text/css";

      link.onload = () => {
        fontNames.forEach((font) => {
          const fontStack = `'${font}', sans-serif`;
          if (!fonts.includes(fontStack)) {
            fonts.push(fontStack);
          }
        });
        Logger.info(`Loaded additional Google Fonts: ${fontNames.join(", ")}`);
      };

      document.head.appendChild(link);
    },

    /**
     * Get statistics about randomized characters
     * @returns {Object} Statistics object
     */
    getStats: () => {
      const chars = document.querySelectorAll(".font-randomized-char");
      const uniqueFonts = new Set();
      const opacities = [];

      chars.forEach((char) => {
        uniqueFonts.add(char.style.fontFamily);
        opacities.push(parseFloat(char.style.opacity));
      });

      const avgOpacity =
        opacities.length > 0
          ? (opacities.reduce((a, b) => a + b, 0) / opacities.length).toFixed(2)
          : 0;

      return {
        totalChars: chars.length,
        uniqueFonts: uniqueFonts.size,
        averageOpacity: avgOpacity,
        opacityRange: "30%-100%",
        availableFonts: fonts.length,
        googleFontsLoaded: googleFonts.length,
        systemFontsDetected: fonts.filter((f) =>
          isFontAvailable(f.split(",")[0].replace(/['"]/g, "")),
        ).length,
      };
    },

    /**
     * Get list of all available fonts
     * @returns {string[]} Array of font families
     */
    getFontList: () => [...fonts],

    /**
     * Set logger level
     * @param {number} level - Log level (0: ERROR, 1: WARN, 2: INFO, 3: DEBUG)
     */
    setLogLevel: (level) => {
      Logger.setLevel(level);
      Logger.info(`Log level set to ${level}`);
    },

    /**
     * Get current logger level
     * @returns {number} Current log level
     */
    getLogLevel: () => Logger.level,
  };

  Logger.info("Font Randomizer (Enhanced) module loaded");
  Logger.debug("Use FontRandomizer.reRandomize() to re-randomize");
  Logger.debug("Use FontRandomizer.getStats() to view statistics");
  Logger.debug(
    "Use FontRandomizer.addCustomFonts(['Font Name']) to add custom fonts",
  );
  Logger.debug(
    "Use FontRandomizer.loadGoogleFonts(['Font Name']) to load Google Fonts",
  );
})();
