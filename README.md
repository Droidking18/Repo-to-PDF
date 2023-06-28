# SourceCode-to-PDF

SourceCode-to-PDF is a tool that allows you to convert a directory of source code into a PDF file. It processes the files, and then creates a PDF.

## Example PDF

[FreeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) repository was converted into a PDF from 42,998 files to 186,453 pages in under 2 minutes. This conversion is purely for example and stress testing purposes. All content belongs to the original authors at FreeCodeCamp. You can view the PDF [here](https://freecodecamppdf.bankkroll.repl.co).
![Screenshot 2023-05-24 212226](https://github.com/BankkRoll/SourceCode-to-PDF/assets/106103625/9ceb176f-37f6-40d9-ab95-080942d2d7c0)


## Installation

To use SourceCode-to-PDF, you have two options: cloning the repository from GitHub or installing it directly using NPX. Choose the method that suits you best.

### Cloning the Repository

1. Clone the repository:
```shell
git clone https://github.com/Droidking18/SourceCode-to-PDF
```

2. Navigate to the SourceCode-to-PDF directory:
```shell
cd SourceCode-to-PDF
```

3. Install the dependencies:
```shell
npm install
```

4. Run the script:
```shell
npm start
```

## Usage

Once you have installed SourceCode-to-PDF, you can use it to generate PDF files from local directories.

1. The script will install and start running. You will just follow the prompt:

You will be prompted to provide the following information:
- The location of the directory, locally
- The name of the output PDF file
- Whether or not you wish to keep the cloned repository after generating the PDF

The script will then process the files, and generate a PDF document based on the provided information.

Please note that you need to have Node.js installed on your system in order to run SourceCode-to-PDF.


## Configuration

SourceCode-to-PDF automatically ignores certain file types and directories (e.g., `.png`, `.git`). To customize the files and directories to ignore, edit the `excludedNames` and `excludedExtensions` variables in `clone.cjs`.


## Troubleshooting / FAQ

**Q: I'm getting an error "Failed to install [package-name]". What should I do?**
A: Make sure you have Node.js and npm installed on your system. Try running the following command to install the required package manually:
```shell
npm install [package-name]
```

**Q: How can I customize the styling of the generated PDF?**
A: You can modify the code in `clone.cjs` to change the font, font size, colors, and other styling options for the PDF document.
- Edit the `excludedExtensions` variable in `clone.cjs` to exclude certain file types from the PDF conversion.


## Contributing

We welcome contributions! Here's how you can help:

- **Report bugs:** If you find a bug, please create an issue on GitHub describing the problem.
- **Suggest enhancements:** If you think of a way to improve SourceCode-to-PDF, we'd love to hear about it! Create an issue on GitHub to share your ideas.
- **Write code:** If you'd like to contribute code to fix a bug or implement a new feature, please fork the repository, make your changes, and submit a pull request.

## License

SourceCode-to-PDF is open source software, licensed under the MIT License. See the `LICENSE` file for more information.
