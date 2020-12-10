# Eleventy Plugin - Social Images (alpha)

This one is a bit of a work in progress. I wanted to be able to generate social images without a service like cloudinary. To achive this I'm overlaing a generated SVG with a background and compositing this with Sharp. There are a few challenges around text wrapping - hence the limited options for now.

Please give it a go and let me know what features need to be in it for version 1.

Example usage:


```js
module.exports = (eleventyConfig) => {

  eleventyConfig.addPlugin(socialImagePlugin, {
    template: "src/images/image.jpg", // The background image
    siteRoot: "_site", // The directory you compile 11ty to! Sorry, I need this to construct URLs 
    output: "_site/assets/", // The output directory (must be in the siteRoot)
    sizes: {
      default: {
        size: [500, 250], // Size to scale the image to
        color: "#fff", // Color of text
        fontSize: 30, // What it says on the label
        lineLength: 30, // Max length of each line
        // The  position of the text box
        // Note: all text is centered for now - more options coming in future (Pssst: make a PR)
        x: "50%",
        y: "55%", 
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
```