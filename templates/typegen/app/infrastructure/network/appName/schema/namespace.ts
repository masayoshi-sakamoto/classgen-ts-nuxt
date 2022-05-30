// THIS FILE IS GENERATED BY CODE GENERATOR. DO NOT CHANGE MANUALLY.
/* tslint:disable */
/* eslint-disable */

<%- classes.map((prop) => {
    return `import ${prop.name} from './models/${prop.name}'`
}).join('\n') %>

export namespace <%= appName %> {
<%= Object.entries(paths).map(([key, path]) => {
    return `  export namespace ${key} {\n`+
    Object.values(path).map((i) => {
        // console.log('-----')
        // console.log(i)
        const request = i.requestBody ?
        `    export type ${i.operationId}Request = ${i.requestBody.tstype}\n` :
        `    export interface ${i.operationId}Request {}\n`
        const response = `    export interface ${i.operationId}Response {\n`+
            Object.values(i.responses).map((j) => {
                return '      '+(j.array ? inflector.pluralize(j.key) : j.key) + ': ' + j.tstype + (j.array ? '[]':'')
            }).join('\n')
        +`\n    }`
        return request + response
    }).join('\n')
    +`\n  }`
}).join('\n') %>
}
