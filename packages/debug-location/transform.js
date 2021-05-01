"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
function transform() {
    return (context) => {
        const factory = context.factory;
        return (source_file) => {
            const filename = source_file.fileName;
            const visitor = node => {
                if (typescript_1.default.isCallExpression(node) && typescript_1.default.isIdentifier(node.expression) && node.expression.getText() === 'debug') {
                    const { line, character } = source_file.getLineAndCharacterOfPosition(node.expression.getStart());
                    return factory.updateCallExpression(node, factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("debug"), factory.createIdentifier("bind")), undefined, [factory.createObjectLiteralExpression([
                            factory.createPropertyAssignment(factory.createIdentifier("file"), factory.createStringLiteral(filename)),
                            factory.createPropertyAssignment(factory.createIdentifier("line"), factory.createNumericLiteral(line + 1)),
                            factory.createPropertyAssignment(factory.createIdentifier("col"), factory.createNumericLiteral(character + 1))
                        ], false)]), node.typeArguments, node.arguments);
                }
                return typescript_1.default.visitEachChild(node, visitor, context);
            };
            return typescript_1.default.visitEachChild(source_file, visitor, context);
        };
    };
}
exports.transform = transform;
