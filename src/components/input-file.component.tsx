import React, {ChangeEvent} from "react";
import {InputProps} from 'antd/lib/input';
import {ButtonProps} from 'antd/lib/button';
import {FormItemProps} from 'antd/lib/form';
import {Button, Col, Form, Input,} from 'antd';
import {UploadOutlined} from "@ant-design/icons";

type PropsType = { buttonProps?: ButtonProps, inputProps: InputProps, placeholder: React.ReactNode, formItemProps: FormItemProps }

export function InputFile({
                              buttonProps = {},
                              inputProps,
                              placeholder,
                              formItemProps,
                          }: PropsType) {
    const inputFile = React.useRef<Input>(null);
    const [file, setFile] = React.useState<File | undefined>(undefined);
    buttonProps.icon = buttonProps.icon === undefined ? <UploadOutlined/> : buttonProps.icon
    buttonProps.style = buttonProps.style ? {...buttonProps.style, width: '100%'} : {width: '100%'};
    inputProps.type = 'file';
    inputProps.hidden = true;
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || undefined)
        if (inputProps.onChange)
            inputProps.onChange(event);
    };
    const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        inputFile?.current?.input.click();
        if (buttonProps?.onClick)
            buttonProps?.onClick(event);
    }
    return (
        <React.Fragment>
            {formItemProps.label !== undefined ?
                <Col {...formItemProps.labelCol || {}}>
                    <label
                        htmlFor={Array.isArray(formItemProps.name) ? formItemProps.name.join('_') : formItemProps.name + ''}
                        className={"ant-form-item-required"}
                    >
                        {formItemProps.label}
                    </label>
                </Col> : null
            }
            <Button {...buttonProps} onClick={onClick}>
                {
                    file ? file.name : placeholder
                }
            </Button>
            <Form.Item {...formItemProps} hidden={true}>
                <Input {...inputProps} onChange={onChange} ref={inputFile}/>
            </Form.Item>

        </React.Fragment>
    )
}