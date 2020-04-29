const ts = require('typescript');

function generateTypescriptDeclarations(filenames, options) {
  let program = ts.createProgram(filenames, {
    ...options,
    emitDeclarationOnly: true,
  });
  let emitResult = program.emit();
  return emitResult.emitSkipped != 1;
}

module.exports = generateTypescriptDeclarations;
