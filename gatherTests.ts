import { Dirent } from "fs";
import { appendFile, readdir, writeFile } from "fs/promises";

class testGatherer {
  rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  async _readImports(path: string) {
    const items = await readdir(path, { withFileTypes: true });
    const files = items
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    const dirs = items.filter((dirent) => dirent.isDirectory());

    if (files) {
      const relativePath = path.replace(`cypress/${this.rootDir}/`, "./");
      files.forEach((file) => this.appendImport(`${relativePath}/${file}`));
    }

    if (!dirs.length) return;

    const newPath = `${path}/${dirs[0].name}`;
    await this._readImports(newPath);
  }

  async appendImport(path: string) {
    if (!path.endsWith("all.cy.ts")) {
      appendFile(`./cypress/${this.rootDir}/all.cy.ts`, `import "${path}"\n`);
    }
  }

  async gather() {
    // create all.cy.ts for integration tests
    this._writeFile("integration", "all");
    this._writeFile("e2e", "all");

    const path = `cypress/${this.rootDir}`;
    let folders = await readdir(path, {
      withFileTypes: true,
    });

    folders = folders.filter((dirent) => dirent.isDirectory());

    this._readImports(path);
  }

  async _writeFile(folder: "e2e" | "integration", file: string) {
    try {
      await writeFile(`cypress/${folder}/${file}.cy.ts`, "");
    } catch (error) {
      console.log(error);
    }
  }
}

const gatherer = new testGatherer("integration");
gatherer.gather();

export {};
