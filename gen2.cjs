const fs = require('fs');

const raw = fs.readFileSync('AlgoVisualizer-main/src/components/dsaaltair.json', 'utf8');

let problems;
try {
  problems = JSON.parse(raw);
} catch(e) {
  console.error('Parse error:', e.message);
  process.exit(1);
}

console.log('Total problems parsed:', problems.length);
console.log('IDs:', problems.map(p => p.id).join(', '));

let output = '/**\n * altairExplanations.js\n * Auto-generated from dsaaltair.json\n */\nexport const altairExplanations = {\n';

problems.forEach(p => {
  const { id, ...rest } = p;
  output += `  "${id}": ${JSON.stringify(rest, null, 2)},\n`;
});

output += '};\n';

fs.writeFileSync('AlgoVisualizer-main/src/data/altairExplanations.js', output, 'utf8');
console.log('Done! Written to altairExplanations.js');
