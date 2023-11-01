import { Modal, message, Checkbox, Input, Form } from "antd";
import { useEffect } from "react";


const ModalEdit = ({ visible, values, onSave, onCancel, isLoading, type = 'edit' }) => {
    ;
    const [form] = Form.useForm();

    useEffect(() => {
        if (values && type === 'edit') {
            form.setFieldsValue(values)
        }
    }, [form, values, type]);

    return (
        <Modal
            visible={visible}
            title={`Edit`}
            okText="Save"
            cancelText="Cancel"
            confirmLoading={isLoading}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then((formValues) => {
                        onSave({ ...values, ...formValues });
                        form.resetFields();
                    })
                    .catch((info) => {
                        message.error('Validation error. Open console.');
                        console.error('Validation error:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                {Object.keys(values).map(((key, i) => {
                    const columnType = type === 'add' ? values[key] : type === 'edit' ? typeof values[key] : null

                    switch (columnType) {
                        case 'boolean':
                            return (
                                <Form.Item
                                    name={key}
                                    label={key}
                                    valuePropName="checked"
                                    key={`${key}_${i}`}>
                                    <Checkbox />
                                </Form.Item>
                            )
                        default:
                            return (
                                <Form.Item
                                    name={key}
                                    label={key}
                                    key={`${key}_${i}`}>
                                    <Input />
                                </Form.Item>
                            )
                    }
                }))}
            </Form>
        </Modal>
    )
}

export default ModalEdit;