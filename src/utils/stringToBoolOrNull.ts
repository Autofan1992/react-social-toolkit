import { BoolOrNullToStringType } from './boolOrNullToStringType'

const stringToBoolOrNull = (value: BoolOrNullToStringType): boolean | null => value === 'true' ? true : value === 'false' ? false : null

export default stringToBoolOrNull