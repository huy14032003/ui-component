import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = './src/components/ui';
const OUTPUT_FILE = './registry.json';

const getFiles = (dir: string): string[] => {
  const files: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  });
  return files;
};

const parseDependencies = (content: string): string[] => {
  const dependencies: string[] = [];
  // Handle both external and internal packages
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const pkg = match[1];
    
    // Ignore relative imports to the same component folder
    if (pkg.startsWith('.')) continue;
    // Ignore internal aliases starting with @ (like @/, @lib/, @components/)
    if (pkg.startsWith('@/')) continue;
    if (pkg.startsWith('@lib/')) continue;
    if (pkg.startsWith('@components/')) continue;
    if (pkg.startsWith('@app/')) continue;

    // External package
    const parts = pkg.split('/');
    if (pkg.startsWith('@')) {
        // Scoped package: @org/pkg
        if (parts.length >= 2) {
            dependencies.push(`${parts[0]}/${parts[1]}`);
        }
    } else {
        dependencies.push(parts[0]);
    }
  }
  return [...new Set(dependencies)].filter(d => d !== 'react' && d !== 'react-dom');
};

const getInternalDeps = (content: string): string[] => {
    const internalDeps: string[] = [];
    const internalRegex = /from\s+['"](?:@\/components\/ui|@components\/ui)\/([^'"]+)['"]/g;
    let match;
    while ((match = internalRegex.exec(content)) !== null) {
        const depPath = match[1];
        // If it's a UI component, just take the first part (folder name)
        // e.g. toggle/Toggle -> toggle
        const componentName = depPath.split('/')[0];
        if (componentName !== 'icons') { // Ignore icons for now or handle them
            internalDeps.push(componentName);
        }
    }
    return [...new Set(internalDeps)];
};

const buildRegistry = () => {
  console.log('Building component registry...');
  const registry: any = {
    core: {
        dependencies: ["clsx", "tailwind-merge"],
        files: [
            {
                path: "src/lib/utils/cn.ts",
                content: fs.readFileSync("./src/lib/utils/cn.ts", "utf-8")
            }
        ]
    },
    components: {}
  };
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR);
  
  componentDirs.forEach((dirName) => {
    const dirPath = path.join(COMPONENTS_DIR, dirName);
    if (!fs.statSync(dirPath).isDirectory()) return;

    const files = getFiles(dirPath);
    const mainFile = files.find(f => f.toLowerCase().includes(dirName.toLowerCase()) && f.endsWith('.tsx')) || files.find(f => f.endsWith('.tsx'));
    
    if (!mainFile) return;

    const content = fs.readFileSync(mainFile, 'utf-8');
    const dependencies = parseDependencies(content);
    const internalDependencies = getInternalDeps(content);

    registry.components[dirName] = {
      name: dirName,
      dependencies,
      internalDependencies,
      files: files.map(f => ({
        path: f.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^src\//, 'src/'), 
        content: fs.readFileSync(f, 'utf-8')
      }))
    };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`Registry built at ${OUTPUT_FILE}`);
};

buildRegistry();
