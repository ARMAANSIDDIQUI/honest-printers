const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/ui');

function stripTypes(content) {
    // Remove import type
    content = content.replace(/import\s+{([^}]+)}\s+from/g, (match, imports) => {
        const cleanedImports = imports.split(',').map(i => i.trim())
            .filter(i => !i.startsWith('type ')) 
            .map(i => i.replace(/^type\s+/, ''))
            .join(', ');
        if (!cleanedImports.trim()) return ''; 
        return `import { ${cleanedImports} } from`;
    });

    // Remove type definitions: type X = ...;
    // content = content.replace(/^type\s+\w+\s*=[
\s\S]*?;/gm, '');
    // Using new RegExp to avoid literal parsing issues if any
    const typeDefRegex = new RegExp('^type\s+\w+\s*=[\s\S]*?;', 'gm');
    content = content.replace(typeDefRegex, '');

    // Remove & VariantProps<...>
    content = content.replace(/&\s*VariantProps<[^>]+>/g, '');
    
    // Remove : React.ComponentProps<...>
    content = content.replace(/:\s*React\.ComponentProps<[^>]+>(\s*&\s*\{[^}]*\})?/g, '');
    
    // Remove generics in function calls
    content = content.replace(/React\.useMemo<[^>]+>\(/g, 'React.useMemo(');
    content = content.replace(/React\.createContext<[^>]+>\(/g, 'React.createContext(');
    content = content.replace(/useRef<[^>]+>\(/g, 'useRef(');
    content = content.replace(/useState<[^>]+>\(/g, 'useState(');

    // Remove empty imports
    content = content.replace(/import\s+\{\s*\}\s+from\s+['"][^'"']+\s*['"]\s*;?\n?/g, '');

    return content;
}

fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (file.endsWith('.jsx')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            content = stripTypes(content);
            fs.writeFileSync(filePath, content);
            console.log('Processed ' + file);
        }
    });
});