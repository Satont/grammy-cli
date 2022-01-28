import * as path from "https://deno.land/std/path/mod.ts";
import { red, bold } from "https://deno.land/std/fmt/colors.ts";
import { copy } from "https://deno.land/std@0.123.0/fs/copy.ts";
class fileGenerator {
    private dirname: string;
    private language: string;
    private runtime: string;
    constructor(dirname: string, language: string, runtime: string) {
        this.dirname = dirname;
        this.language = language;
        this.runtime = runtime;
    }
    async generateFiles() {
        console.log(import.meta.url, Deno.mainModule)
        try {
            // path of the template files
            const sourceDirectory = path.resolve(Deno.mainModule.replace('/mod.ts', '').replace('file:', ''), 'commands', 'init', 'template', this.runtime, this.language)
            //path of the user directory where files will be copied
            const destinationDirectory = path.resolve(Deno.cwd(), this.dirname)
            await copy(sourceDirectory, destinationDirectory);
            return true;
        } catch (e) {
            console.log(red(bold(`Encounter an unexpected error ${e}\n`)));
            return false;
        }
    }

}
export default fileGenerator;
