import React from 'react'
import PropTypes from 'prop-types'
import {Button, DatePicker, Form, Select, Space} from 'antd'
import I18n from 'I18n'
import {MinusCircleOutlined, PlusCircleOutlined} from '@ant-design/icons'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/en_US';
//----------------------------------------------------------------------------
/*
 * Formulaire d'informations de l'engin (Form 5/7)
 * Equipement
 */
const Etape5Form = ({
                        formItemLayout,
                        form,
                        engin,
                        equipement,
                        montage,
                        equipementValues,
                    }) => {
    console.log("equipement", equipement)
    return (
        <Form
            form={form}
            initialValues={{
                'equipements': [
                    {
                        'id_equipement': engin?.equipement,
                        'date_montage': engin?.montage,
                    }
                ]
            }}
        >
            {/* Equipement */}
            <Form.List
                name="equipements"
                // rules={[
                //     {
                //         validator: async (_, names) => {
                //             if (!names || names.length < 1) {
                //                 return Promise.reject(
                //                     I18n.t(`fields.equipement.min`)
                //                 )
                //             }
                //         },
                //     },
                // ]}
            >
                {(fields, {add, remove}, {errors}) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key}>
                                {/* Equipement */}
                                <Form.Item
                                    style={{
                                        width: 300,
                                    }}
                                    label={I18n.t(`pages.engin.table.equipement`)}
                                    name={[field.name, 'id_equipement']}
                                    rules={[
                                        {
                                            required: true,
                                            message: I18n.t(`fields.engin.requiredMessageEquipement`),
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder={I18n.t(`fields.engin.placeholderEquipement`)}

                                    >
                                        {equipementValues.map((equipements) => {
                                            // if (
                                            //     Array.from(selectedEquipement.values()).indexOf(
                                            //         equipements.libelle
                                            //     ) === -1
                                            // )
                                            return (
                                                <Select.Option key={equipements.libelle}
                                                               value={equipements.idequipements}>
                                                    {equipements.libelle}

                                                </Select.Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                {/* date Montage */}
                                <Form.Item
                                    label={I18n.t(`pages.engin.table.montage`)}
                                    name={[field.name, 'date_montage']}
                                    rules={[
                                        {
                                            required: true,
                                            message: I18n.t(`fields.engin.requiredMessageMontage`),
                                        },
                                    ]}
                                >
                                    <DatePicker defaultValue={moment(montage)} locale={locale} format="yyyy-MM-DD"
                                                style={{
                                                    width: 300,
                                                }}/>
                                </Form.Item>
                                <MinusCircleOutlined
                                    onClick={() => {
                                        remove(field.name)

                                    }}
                                />
                            </Space>
                        ))}
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusCircleOutlined/>}
                        >
                            {I18n.t(`modals.equipement.create`)}
                        </Button>
                        <Form.ErrorList errors={errors}/>
                    </>
                )}
            </Form.List>
        </Form>
    )
}

Etape5Form.propTypes = {
    formItemLayout: PropTypes.object,
    form: PropTypes.any,
    equipement: PropTypes.number,
    montage: PropTypes.object,

}

export default Etape5Form
