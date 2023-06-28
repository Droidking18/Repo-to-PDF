#!/usr/bin/env node
const fs = require('fs');
const { type } = require('os');
const fsPromises = fs.promises;
const path = require('path');
const PDFDocument = require('pdfkit');
const isBinaryFile = require('isbinaryfile').isBinaryFileSync;

let chalk;
let inquirer;
let ora;

const spinnerPromise = import('ora').then((oraModule) => {
    ora = oraModule.default;
    return ora('Setting everything up...').start();
});

Promise.all([import('chalk'), import('inquirer'), spinnerPromise]).then(([chalkModule, inquirerModule, spinner]) => {
    chalk = chalkModule.default;
    inquirer = inquirerModule.default;
    spinner.succeed('Setup complete');
    askForDirectory();
}).catch((err) => {
    spinnerPromise.then((spinner) => {
        spinner.fail('An error occurred during setup');
    });
    console.error(err);
});

async function askForDirectory() {
    const questions = [
        {
            name: 'directoryPath',
            message: 'Please provide the path to the local directory:',
            validate: function(value) {
                return fs.existsSync(value) && fs.lstatSync(value).isDirectory()
                    ? true
                    : 'Please enter a valid directory path.';
            }
        },
        {
            name: 'outputFileName',
            message: 'Please provide an output file name:',
            default: 'output.pdf'
        },
        {
            name: 'fileTypes',
            message: 'Please provide the file types you want to include: (separate with comma) eg: "h,c,cpp,test.*"',
            default: '',
            validate: function(value) {
                return value.length > 0
                    ? true
                    : 'Please enter at least one file type.';
            }
        }
    ];

    console.log(chalk.cyanBright(`

██████╗ ███████╗██████╗  ██████╗         ██████╗         ██████╗ ██████╗ ███████╗
██╔══██╗██╔════╝██╔══██╗██╔═══██╗        ╚════██╗        ██╔══██╗██╔══██╗██╔════╝
██████╔╝█████╗  ██████╔╝██║   ██║         █████╔╝        ██████╔╝██║  ██║█████╗
██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║        ██╔═══╝         ██╔═══╝ ██║  ██║██╔══╝
██║  ██║███████╗██║     ╚██████╔╝        ███████╗        ██║     ██████╔╝██║
╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝         ╚══════╝        ╚═╝     ╚═════╝ ╚═╝

Welcome to Repo-to-PDF! Let's get started...
`));

    const answers = await inquirer.prompt(questions);
    console.log(chalk.cyanBright('\nProcessing your request...\n'));
    main(answers.directoryPath, answers.outputFileName, answers.fileTypes);
}

async function main(directoryPath, outputFileName, fileTypes) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(outputFileName));

    let fileCount = 0;
    const spinner = ora(chalk.blueBright('Processing files...')).start();

    appendFilesToPdf(directoryPath).then(() => {
        doc.end();
        spinner.succeed(chalk.greenBright(`PDF created with ${fileCount} files processed.`));
    });

    async function appendFilesToPdf(directory) {

        let fileTypesArray = fileTypes.split(',');
        const files = await fsPromises.readdir(directory);
        for (let file of files) {
            const filePath = path.join(directory, file);
            const stat = await fsPromises.stat(filePath);

            if (stat.isFile()) {
                fileCount++;
                spinner.text = chalk.blueBright(`Processing files... (${fileCount} processed)`);
                let fileName = path.relative(directoryPath, filePath);
                if (isBinaryFile(filePath)) {
                    continue;
                } else {

                    let shouldSkip = true;

                    for (let fileType of fileTypesArray) {

                        fileType = fileType.replace('*', '');

                        if (filePath.indexOf(fileType) > -1) {
                            shouldSkip = false;
                            break;
                        }
                    }

                    console.warn(shouldSkip)

                    if (shouldSkip) {
                        continue;

                    }

                    let data = await fsPromises.readFile(filePath, 'utf8');
                    data = data.replace(/Ð/g, '\n');
                    data = data.replace(/\r\n/g, '\n');
                    data = data.replace(/\r/g, '\n');
                    doc.addPage().font('Courier').fontSize(10).text(`${fileName}\n\n${data}`, { lineGap: 4 });
                }
            } else if (stat.isDirectory()) {
                await appendFilesToPdf(filePath);
            }
        }
    }

    doc.on('finish', () => {
        spinner.succeed(chalk.greenBright(`PDF created with ${fileCount} files processed.`));
    });
}