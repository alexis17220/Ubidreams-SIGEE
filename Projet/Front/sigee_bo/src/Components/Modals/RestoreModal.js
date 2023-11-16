import React from 'react'
import { Modal, Space } from 'antd'
import PropTypes from 'prop-types'
import ExclamationCircleOutlined from '@ant-design/icons'
import I18n from 'I18n'

const RestoreModal = ({ restoreText, opened, validateArchive, hideModal }) => {
  return (
    <Modal
      title={I18n.t('common.restoring')}
      okText={I18n.t('common.yes')}
      cancelText={I18n.t('common.no')}
      open={opened}
      onCancel={hideModal}
      onOk={validateArchive}
      content={restoreText}
    >
      <Space>
        <ExclamationCircleOutlined />
        {restoreText}
      </Space>
    </Modal>
  )
}

RestoreModal.propTypes = {
  restoreText: PropTypes.string,
  opened: PropTypes.bool,
  validateArchive: PropTypes.func,
  hideModal: PropTypes.func,
}

RestoreModal.default = {
  deleteText: '',
  opened: false,
}

export default RestoreModal
