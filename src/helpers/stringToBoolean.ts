export type StringBooleanType = 'false' | 'true'

const stringToBoolean = (value: StringBooleanType): boolean | undefined => value === 'true' ? true :  value === 'false' ? false : undefined

export default stringToBoolean