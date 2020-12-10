const sharp = require("sharp");
const path = require("path");
const fs = require("fs-extra");
const svgCompositTemplate = require("./svg-composite");

const imageFormats = [".jpeg", ".jpg", ".png", ".webp", ".gif", ".tiff"];

const getSocialImage = (inputPath, outputPath, templateOptions) => {
  return sharp(inputPath)
    .resize(templateOptions.size[0], templateOptions.size[1])
    .composite([{ input: Buffer.from(svgCompositTemplate(templateOptions)) }])
    .toFile(outputPath, (err, info) => {
      console.log({ err, info });
    });
};

module.exports = (eleventyConfig, options) => {
  eleventyConfig.addShortcode("socialImage", (text, size) => {
    size = size && options.sizes[size] ? size : "default";

    const w = options.sizes[size].size[0];
    const h = options.sizes[size].size[1];

    const ext = path.extname(options.template);

    if (!imageFormats.includes(ext)) return;

    const filename = path.basename(options.template, ext);
    const outputPath = path.join(
      options.output,
      `${filename}-${size}-${w}-${h}${ext}`
    );

    fs.ensureDir(options.output);

    getSocialImage(options.template, outputPath, {
      ...options.sizes[size],
      size: [w, h],
      text,
    });

    return `${path.relative(options.siteRoot, outputPath)}`;
  });
};