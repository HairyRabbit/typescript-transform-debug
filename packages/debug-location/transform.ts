import ts from 'typescript'

export function transform(): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    const factory = context.factory

    return (source_file: ts.SourceFile) => {
      const filename = source_file.fileName
      
      const visitor: ts.Visitor = node => {
        if(ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.getText() === 'debug') {
          const { line, character } = source_file.getLineAndCharacterOfPosition(node.expression.getStart())
          return factory.updateCallExpression(
            node,
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("debug"),
                factory.createIdentifier("bind")
              ),
              undefined,
              [factory.createObjectLiteralExpression(
                [
                  factory.createPropertyAssignment(
                    factory.createIdentifier("file"),
                    factory.createStringLiteral(filename)
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier("line"),
                    factory.createNumericLiteral(line + 1)
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier("col"),
                    factory.createNumericLiteral(character + 1)
                  )
                ],
                false
              )]
            ),
            node.typeArguments,
            node.arguments,
          )
        }

        return ts.visitEachChild(node, visitor, context)
      }

      return ts.visitEachChild(source_file, visitor, context)
    }
  }
}
