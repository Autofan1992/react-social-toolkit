import { Input, Select, SelectProps } from 'formik-antd'

const { Option } = Select

export const createTextField = <NP extends string>(
    placeholder: string | undefined,
    name: NP,
    type?: string,
    props = {},
) => <Input placeholder={placeholder} name={name} type={type} {...props}/>

export const createTextAreaField = <NP extends string>(
    placeholder: string | undefined,
    name: NP,
    props = {},
) => <Input.TextArea placeholder={placeholder} name={name} {...props}/>

export const createSelectField = <NP extends string>(
    defaultValue: string | undefined,
    name: NP,
    options: Array<SelectProps>,
    props = {},
) => <Select defaultValue={defaultValue} name={name} {...props}>
    {options.map(option => <Option key={option.name} {...option}>{option.name}</Option>)}
</Select>