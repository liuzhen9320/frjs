# Font Randomizer

A lightweight JavaScript library that randomizes fonts and opacity for text elements on web pages, creating a unique visual effect.

## Features

- 🎨 **Random Font Assignment**: Applies random fonts to each character
- 🌈 **Dynamic Opacity**: Random opacity from 30% to 100%
- 🖱️ **Interactive Effects**: Hover animations and scaling
- 📱 **Responsive Design**: Mobile-friendly adjustments
- 🔍 **Smart Exclusion**: Automatically excludes form elements, scripts, and code blocks
- 📊 **Statistics Tracking**: Monitor randomization statistics
- 🛠️ **Configurable Logging**: 4-level logging system

## Installation

Simply include the script in your HTML:

```html
<script src="index.js"></script>
```

Or inject it into any webpage via browser console.

## Usage

### Basic Usage

The script automatically runs when the page loads. No additional setup required!

### API Methods

```javascript
// Re-randomize all text
FontRandomizer.reRandomize();

// Get statistics
const stats = FontRandomizer.getStats();
console.log(stats);
// Output: { totalChars: 1234, uniqueFonts: 15, averageOpacity: "0.65", ... }

// Control the observer
FontRandomizer.stop(); // Stop watching for new content
FontRandomizer.restart(); // Resume watching

// Logging control
FontRandomizer.setLogLevel(2); // Set to INFO level
FontRandomizer.getLogLevel(); // Get current level
```

### Exclusion Methods

Exclude elements from randomization by adding:

```html
<!-- Class-based exclusion -->
<div class="no-font-randomize">This text won't be randomized</div>

<!-- ID-based exclusion -->
<div id="no-font-randomize">This text won't be randomized</div>

<!-- Data attribute exclusion -->
<div data-no-randomize>This text won't be randomized</div>
```

## Logging Levels

| Level | Name  | Description                   |
| ----- | ----- | ----------------------------- |
| 0     | ERROR | Error messages only           |
| 1     | WARN  | Warnings and errors           |
| 2     | INFO  | General information (default) |
| 3     | DEBUG | Detailed debugging info       |

## Supported Fonts

The library includes 24 web-safe fonts:

- Sans-serif: Arial, Helvetica, Verdana, Tahoma, etc.
- Serif: Times New Roman, Georgia, Garamond, etc.
- Monospace: Courier New, Consolas, Monaco, etc.
- Display: Impact, Comic Sans MS, etc.

## Performance

- **Lightweight**: ~5KB minified
- **Efficient**: Uses DocumentFragment for DOM manipulation
- **Smart**: Debounced mutation observer (100ms delay)
- **Memory-friendly**: No memory leaks, proper event cleanup

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Configuration

### Exclude Additional Elements

```javascript
// Add to excludedTags Set before running
excludedTags.add("CUSTOM-ELEMENT");

// Add to excludedSelectors array
excludedSelectors.push(".my-custom-class");
```

### Modify Opacity Range

```javascript
// Edit the getRandomOpacity function
const getRandomOpacity = () => {
  const min = 0.5; // 50%
  const max = 1.0; // 100%
  return (Math.random() * (max - min) + min).toFixed(2);
};
```

## Examples

### Example 1: Basic Implementation

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Font Randomizer Demo</title>
  </head>
  <body>
    <h1>Welcome to Font Randomizer</h1>
    <p>This text will have random fonts and opacity!</p>
    <script src="font-randomizer.js"></script>
  </body>
</html>
```

### Example 2: With Exclusions

```html
<div>
  <p>This text will be randomized</p>
  <code class="no-font-randomize">This code stays normal</code>
  <p data-no-randomize>This paragraph is excluded</p>
</div>
```

### Example 3: Programmatic Control

```javascript
// Wait for page load
document.addEventListener("DOMContentLoaded", function () {
  // Set quiet logging
  FontRandomizer.setLogLevel(1);

  // Re-randomize every 5 seconds
  setInterval(() => {
    FontRandomizer.reRandomize();
  }, 5000);

  // Log stats every 30 seconds
  setInterval(() => {
    console.log("Stats:", FontRandomizer.getStats());
  }, 30000);
});
```

## Troubleshooting

### Common Issues

**Q: Some text isn't being randomized**
A: Check if the element has exclusion classes or is within excluded tags (script, style, input, etc.)

**Q: Page performance is slow**
A: Reduce logging level with `FontRandomizer.setLogLevel(0)` or temporarily stop the observer with `FontRandomizer.stop()`

**Q: Fonts look the same**
A: Some fonts may appear similar. Use `FontRandomizer.getStats()` to verify different fonts are being applied.

## License

This project is licensed under the WTFPL (Do What The Fuck You Want To Public License).

## Contributing

Feel free to submit issues, feature requests, or pull requests!
