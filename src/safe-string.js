export const FLAG = '__safe__'

export default (str) => Object.defineProperty(new String(str), FLAG, { value: true })
