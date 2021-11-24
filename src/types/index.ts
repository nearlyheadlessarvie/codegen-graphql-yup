// TYPES
import { ListTypeNode, NamedTypeNode, NonNullTypeNode, TypeNode } from 'graphql';
import type { InputValueDefinitionNode } from 'graphql';

export interface INodes { name: string, fields: InputValueDefinitionNode[] }

export interface IConfig {
    defaultRequiredMessage?: string
    onlyWithConstrain?: Boolean
    typesImportFrom?: string
    excludeSuffix?: string[]
}

export const isNamed = (type: TypeNode): type is NamedTypeNode => {
    return (type as NamedTypeNode).name !== undefined;
}

export const isList = (type: TypeNode): type is ListTypeNode => {
    return (type as ListTypeNode).kind !== undefined;
}

export const isNonNull = (type: TypeNode): type is NonNullTypeNode => {
    return (type as NonNullTypeNode).kind !== undefined;
}