import React from 'react'
import { Modal, Space } from 'antd'
import PropTypes from 'prop-types'
import ExclamationCircleOutlined from '@ant-design/icons'
import I18n from 'I18n'

const ArchiveModal = ({ deleteText, opened, validateArchive, hideModal }) => {
  return (
    <Modal
      title={I18n.t('common.deleting')}
      okText={I18n.t('common.yes')}
      cancelText={I18n.t('common.no')}
      open={opened}
      onCancel={hideModal}
      onOk={validateArchive}
      content={deleteText}
    >
      <Space>
        <ExclamationCircleOutlined />
        {deleteText}
      </Space>
    </Modal>
  )
}

ArchiveModal.propTypes = {
  deleteText: PropTypes.string,
  opened: PropTypes.bool,
  validateArchive: PropTypes.func,
  hideModal: PropTypes.func,
}

ArchiveModal.default = {
  deleteText: '',
}

export default ArchiveModal
