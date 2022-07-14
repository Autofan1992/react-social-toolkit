export type BoolOrNullToStringType = 'false' | 'true' | 'null'

const boolOrNullToString = (value: boolean | null): BoolOrNullToStringType => value === true ? 'true' : value === false ? 'false' : 'null'

export default boolOrNullToString