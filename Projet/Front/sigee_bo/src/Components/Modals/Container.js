import React from 'react'
import PropTypes from 'prop-types'

// Libraries
import { get } from 'lodash'
import { Modal, Empty, Alert, Button } from 'antd'

const ModalContainer = ({
  visible,
  loading,
  okText,
  children,
  title,
  headerText,
  onCancel,
  onOk,
  footer,
  width,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onOk}
      okText={okText}
      confirmLoading={loading}
      onCancel={onCancel}
      footer={footer}
      width={width}
    >
      {headerText && <Alert message={headerText} type="warning" />}

      {children || <Empty />}
    </Modal>
  )
}

ModalContainer.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  children: PropTypes.element,
  title: PropTypes.string,
  headerText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  footer: PropTypes.object,
  width: PropTypes.number,
}

ModalContainer.defaultProps = {
  visible: false,
  loading: false,
  okText: 'Ok',
  children: null,
  title: null,
  headerText: null,
  onCancel: null,
  onOk: null,
}

export default ModalContainer
