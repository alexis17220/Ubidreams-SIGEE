import React from 'react'

// Libraries
import { Breadcrumb } from 'antd'

const CustomBreadcrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  )
}

CustomBreadcrumb.propTypes = {}

CustomBreadcrumb.defaultProps = {}

export default CustomBreadcrumb
