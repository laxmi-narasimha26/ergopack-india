// Script to fix iOS dark mode in newsletter
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/newsletters/templates/22-the-reveal-announcement.html');

let content = fs.readFileSync(filePath, 'utf8');

// Replace all white background styles with class and bgcolor
const replacements = [
  // Partnership section
  {
    from: 'style="padding: 40px 25px; background-color: #ffffff;"',
    to: 'class="white-bg" bgcolor="#ffffff" style="padding: 40px 25px; background-color: #ffffff !important;"',
  },
  // What is ErgoPack section
  {
    from: 'style="padding: 45px 30px; background-color: #ffffff; text-align: center;"',
    to: 'class="white-bg" bgcolor="#ffffff" style="padding: 45px 30px; background-color: #ffffff !important; text-align: center;"',
  },
  // Footer
  {
    from: 'style="padding: 20px 25px; background-color: #ffffff; text-align: center; border-top: 1px solid #eeeeee;"',
    to: 'class="white-bg" bgcolor="#ffffff" style="padding: 20px 25px; background-color: #ffffff !important; text-align: center; border-top: 1px solid #eeeeee;"',
  },
  // Add !important to existing white backgrounds
  {
    from: 'background-color: #ffffff;',
    to: 'background-color: #ffffff !important;',
  },
  // CTA button white bg
  {
    from: 'style="background-color: #ffffff; border-radius: 4px;"',
    to: 'style="background-color: #ffffff !important; border-radius: 4px;"',
  },
  // f9f9f9 backgrounds (light gray)
  {
    from: 'background-color: #f9f9f9;',
    to: 'background-color: #f9f9f9 !important;',
  },
  // Partnership boxes - add dark text class for headings
  {
    from: '<h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #222222;">',
    to: '<h3 class="dark-text" style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #222222 !important;">',
  },
  // Paragraphs with #666666 (gray text)
  {
    from: 'color: #666666;',
    to: 'color: #666666 !important;',
  },
  // Dark text #222222
  {
    from: 'color: #222222;',
    to: 'color: #222222 !important;',
  },
  // Gray text #555555
  {
    from: 'color: #555555;',
    to: 'color: #555555 !important;',
  },
];

replacements.forEach(({ from, to }) => {
  content = content.split(from).join(to);
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ iOS dark mode fixes applied!');
console.log('Changes made:');
replacements.forEach((r) => console.log(`  - ${r.from.substring(0, 50)}...`));
