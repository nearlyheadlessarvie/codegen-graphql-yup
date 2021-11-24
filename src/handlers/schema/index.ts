// VENDOR
import { printSchemaWithDirectives } from 'graphql-tools';
import { GraphQLSchema, parse, visit, InputValueDefinitionNode } from 'graphql';
// TYPES
import { INodes } from '../../types/index';
// CONSTANTS
import { DIRECTIVE_NAME } from '../../utils/constants';

/**
 * This function implements visitor pattern and extract the inputs Objects from the schema.
 * @param schema
 * @type GraphQLSchema
 */
const schemaHandler = (schema: GraphQLSchema, onlyWithConstrain?: Boolean, excludeSuffix?: string[]): INodes[] => {
    // Returns a string representation of the schema
    const printedSchema = printSchemaWithDirectives(schema);

    // Transforms the string into ASTNode
    const astNode = parse(printedSchema);

    // nodes with a field with constraint directive 
    const nodes: INodes[] = []
    const sortedNodes: INodes[] = []

    // For more info search graphql visitor pattern
    visit(astNode, {
        leave:
        {
            InputObjectTypeDefinition: (node) => {
                let hasConstraint = Boolean(!onlyWithConstrain)
                if (!hasConstraint) {
                    node.fields?.forEach((field: InputValueDefinitionNode) => {
                        const constraint = field.directives?.find(directive => directive.name.value === DIRECTIVE_NAME)
                        if (constraint) {
                            hasConstraint = true
                        }
                    })
                }
                if (excludeSuffix && excludeSuffix.some(suffix => node.name.value.endsWith(suffix))) hasConstraint = false;
                if (hasConstraint) nodes.push({ name: node.name.value, fields: [...node.fields!] })
            },
        }
    });

    const depTree = (node:INodes) => {
        node.fields.forEach(field => {
            const dep = nodes.find(x => x.name === field.name.value)
            if (dep) {
                depTree(dep)
                sortedNodes.push(dep);
            }
        })
        sortedNodes.push(node);
    }
    nodes.forEach(node => depTree(node));
    return sortedNodes;
}
export default schemaHandler 