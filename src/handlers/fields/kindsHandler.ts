// TYPE
import { isList, isNamed } from '../../types/index';
import { NamedTypeNode, TypeNode } from "graphql"
// UTILS
import { isArray, isRequired, isType } from '../../utils/typesCheckers';
// HANDLERS
import fieldNamedTypeHandler from './namedTypesHandlers';
import { isNonNullTypeNode } from '@graphql-tools/merge';

/**
 * This function diference the type of the field and do the magic in nested types
 * @param type 
 * @param defaultRequiredMessage 
 */

const fieldKindHandler = (type: TypeNode, defaultRequiredMessage: string) => {
    let result = ''
    if (isArray(type.kind) && isList(type)) {
        result = `yup.array().of(${fieldKindHandler(type.type, defaultRequiredMessage)})`
    }

    if (isRequired(type.kind) && isNonNullTypeNode(type)) {
        result = `${fieldKindHandler(type.type, defaultRequiredMessage)}.required('${defaultRequiredMessage}')`
    }


    if (isType(type.kind) && isNamed(type)) {
        result = fieldNamedTypeHandler(type.name.value)
    }

    return result
}

export default fieldKindHandler;

