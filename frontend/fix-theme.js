const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We only want to replace if dark: isn't already there.
      // But a simple global replace and then a cleanup might be easier.
      
      let newContent = content;
      
      // Replace bg-black with bg-white dark:bg-black (unless it's already dark:bg-black)
      newContent = newContent.replace(/\bbg-black\b/g, 'bg-white dark:bg-black');
      // Fix double replacements
      newContent = newContent.replace(/bg-white dark:bg-white dark:bg-black/g, 'bg-white dark:bg-black');
      newContent = newContent.replace(/dark:bg-white dark:bg-black/g, 'dark:bg-black');
      
      // Replace text-white with text-zinc-900 dark:text-white
      newContent = newContent.replace(/\btext-white\b/g, 'text-zinc-900 dark:text-white');
      // Fix double replacements
      newContent = newContent.replace(/text-zinc-900 dark:text-zinc-900 dark:text-white/g, 'text-zinc-900 dark:text-white');
      newContent = newContent.replace(/dark:text-zinc-900 dark:text-white/g, 'dark:text-white');

      // Replace bg-zinc-950 with bg-white dark:bg-zinc-950
      newContent = newContent.replace(/\bbg-zinc-950\b/g, 'bg-white dark:bg-zinc-950');
      newContent = newContent.replace(/bg-white dark:bg-white dark:bg-zinc-950/g, 'bg-white dark:bg-zinc-950');
      newContent = newContent.replace(/dark:bg-white dark:bg-zinc-950/g, 'dark:bg-zinc-950');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'src/components/landing'));
processDir(path.join(__dirname, 'src/components/form'));
processDir(path.join(__dirname, 'src/components/ui'));
processDir(path.join(__dirname, 'src/app'));
