import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import I18n from 'I18n'

const { Paragraph, Text } = Typography

const NoAccess = () => {
  return (
    <Result
      status="error"
      title={I18n.t(`errors.noAccess.title`)}
      subTitle={I18n.t(`errors.noAccess.description`)}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          ></Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          {I18n.t(`errors.noAccess.solution`)}{' '}
        </Paragraph>
      </div>
    </Result>
  )
}

export default NoAccess
