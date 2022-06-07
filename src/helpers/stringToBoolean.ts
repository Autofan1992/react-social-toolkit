export type StringBooleanType = 'false' | 'true'

const stringToBoolean = (value: StringBooleanType): boolean | null => value === 'true' ? true :  value === 'false' ? false : null

export default stringToBoolean