// UTILS
import { isRef, isBoolean, isString, isNumber, isDate } from '../../utils/typesCheckers';

/**
 * This functions handle primitives types and references 
 * @param type 
 */

const fieldNamedTypeHandler = (type: string) => {
    let result = 'yup.'

    if (isRef(type)) {
        result = type + 'Schema'
    }

    else if (isBoolean(type)) {
        result = result + 'boolean()'
    }

    else if (isString(type)) {
        result = result + 'string()'
    }

    else if (isNumber(type)) {
        result = result + 'number()'
    }
    
    else if (isDate(type)) {
        result = result + 'date()'
    }
    
    else {
        // Assume enum?
        result = result + `mixed<graph.${type}>().oneOf(Object.values(graph.${type}))`
    }

    return result
}

export default fieldNamedTypeHandler
