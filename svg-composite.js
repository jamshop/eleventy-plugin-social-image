module.exports = ({
  css,
  size,
  text,
  x,
  y,
  lineLength=30,
  fontSize = 25,
  color = "#555;",
}) => {

  const dy = fontSize + fontSize * 0.1;
  const lines = text.split(" ").reduce((prev, word, i) => {
    // if every sentent in the lines array is larger than lineLength when curr word is added add a new line:
    if(prev.every(sentence => (sentence.length + word.length) > lineLength)) {
      prev.push(word);
    } else {
      prev = prev.map(sentence => {
        if((sentence.length + word.length) > lineLength) {
          return sentence;
        } else {
          return `${sentence} ${word}`;
        }
      })
    }
    return prev;
  },[])
  console.log(lines);
  // const lines = [text, text];
  return `<svg viewBox="0 0 ${size[0]} ${
    size[1]
  }" xmlns="http://www.w3.org/2000/svg">
  <style>
    .text { ${
      css
        ? css
        : `font-size: ${fontSize}; font-family: sans-serif; fill: ${color}`
    } }
  </style>
  <circle opacity="0.8" cx="${size[0] / 2}" cy="${size[1] / 2}" r="${
    size[0] / 6
  }" />
  <circle opacity="0.8" cx="${size[0] / 2}" cy="${size[1] / 2}" r="${
    size[0] / 12
  }" />
  <text text-anchor="middle" dominant-baseline="middle" class="text" x="${x}" y="${y}">
    ${lines
      .map((line) => `<tspan x="${x}" dy="${dy}">${line}</tspan>`)
      .join("")}
  </text>
</svg>`;
};