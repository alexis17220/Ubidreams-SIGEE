import React, { useState } from 'react'

// Libraries
import I18n from 'i18next'
import PropTypes from 'prop-types'
import { withNavigation } from '@react-navigation/core'
import { Table, Button, Input, Dropdown, Menu, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import {
  map,
  get,
  isEmpty,
  isFunction,
  includes,
  has,
  defaultTo,
  isNil,
  forEach,
} from 'lodash'

// Styles
import './Styles/TableLayoutComponent.less'

// Helpers
import { searchData } from 'Helpers'

const { Search } = Input
const { Column, ColumnGroup } = Table

const TableLayout = ({
  onChangeSearch,
  buttons,
  buttonsPosition,
  tables,
  loading,
  navigation,
  titleEnabled,
  search,
  searchEnabled,
  searchPosition,
  searchFilterFields,
  updateSelectedData,
  allowSelection,
  importExcelFile,
}) => {
  const [searchText, setSearchText] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  /**
   * Filtre les données en fonction du motif renseigné dans le champs de recherche
   *
   * Retourne un tableau contenant toutes les données en fonction de la recherche de l'utilisateur
   * @return {array}
   */
  const filterData = (data) => {
    let searchResultRows = searchData(data, searchText)

    if (
      !isEmpty(searchResultRows) &&
      !isEmpty(searchFilterFields) &&
      !isNil(searchFilterFields)
    ) {
      searchResultRows = map(searchResultRows, (searchResultRow) => {
        forEach(searchFilterFields, (filterField) => {
          searchResultRow[filterField] = searchData(
            searchResultRow[filterField],
            searchText
          )
        })

        return searchResultRow
      })
    }

    return searchResultRows
  }

  const handleSearch = (event) => {
    const newSearchText = get(event, 'target.value', event)
    setSearchText(newSearchText)
    onChangeSearch(newSearchText)
  }

  const renderSearchBar = (position) => {
    const isRendered = includes(['both', position], searchPosition)

    return (
      isRendered &&
      searchEnabled && (
        <Search
          placeholder={I18n.t('fields.search.placeholder')}
          enterButton
          onSearch={handleSearch}
          onChange={get(search, 'immediate') && handleSearch}
          allowClear
        />
      )
    )
  }

  const handleButtonClick = (action, routeName) => {
    if (isFunction(action)) {
      action()
    } else if (!isEmpty(routeName)) {
      navigation.navigate(routeName)
    }
  }

  const renderButton = (
    { label = '', icon, type = 'primary', action, routeName },
    index = 0
  ) => {
    if (label == I18n.t('common.import')) {
      return (
        <Upload
          key={index}
          maxCount={1}
          beforeUpload={(file) => {
            importExcelFile(file)
            return false
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            {I18n.t(`fields.avatar.import`)}
          </Button>
        </Upload>
      )
    } else {
      return (
        <Button
          key={index}
          onClick={() => handleButtonClick(action, routeName)}
          type={type}
          icon={icon}
        >
          {label}
        </Button>
      )
    }
  }

  const renderDropdown = (
    { label = '', icon, type = 'primary', items, routeName },
    index = 0
  ) => (
    <Dropdown
      key={index}
      trigger="click"
      overlay={
        <Menu>
          {map(items, (item) => {
            return (
              <Menu.Item key={item.key}>
                <Button type="text" onClick={item.action}>
                  {item.label}
                </Button>
              </Menu.Item>
            )
          })}
        </Menu>
      }
    >
      <Button type={type} icon={icon}>
        {label}
      </Button>
    </Dropdown>
  )

  const renderButtons = (position) => {
    const isRendered = includes(['both', position], buttonsPosition)

    return (
      isRendered &&
      !isEmpty(buttons) && (
        <div className="buttons">
          {map(
            buttons,
            (
              { render = renderButton, renderDrop = renderDropdown, ...button },
              index
            ) => {
              if (button.items != null) return renderDrop(button, index)
              else return render(button, index)
            }
          )}
        </div>
      )
    )
  }

  const renderColumns = (columns) => {
    return map(columns, (column) => {
      if (has(column, 'columns')) {
        const { columns, ...columnProps } = column
        return (
          <ColumnGroup {...columnProps}>
            {renderColumns(get(column, 'columns'))}
          </ColumnGroup>
        )
      } else {
        return !get(column, 'hidden') && <Column {...column} />
      }
    })
  }

  const renderTables = () => {
    return map(
      tables,
      ({ columns, rows = [], pagination, ...props }, index) => {
        console.log("rows", rows)
        const dataSource = searchEnabled
          ? filterData(rows.results)
          : rows.results
        const length = defaultTo(
          get(pagination, 'total'),
          get(dataSource, 'length')
        )

        const titleSearch = searchEnabled
          ? searchText
            ? I18n.t(
                length > 1
                  ? 'components.tableLayout.displayed-count.results.plural'
                  : 'components.tableLayout.displayed-count.results.singular',
                { length }
              )
            : I18n.t(
                length > 1
                  ? 'components.tableLayout.displayed-count.elements.plural'
                  : 'components.tableLayout.displayed-count.elements.singular',
                { length }
              )
          : I18n.t(
              length > 1
                ? 'components.tableLayout.displayed-count.elements.plural'
                : 'components.tableLayout.displayed-count.elements.singular',
              { length }
            )

        const title = titleEnabled && <p>{titleSearch}</p>
        return (
          <div key={index} className="table-layout-table">
            <Table
              title={() => title}
              dataSource={dataSource}
              loading={loading}
              pagination={pagination}
              {...props}
              rowSelection={allowSelection ? rowSelection : null}
            >
              {renderColumns(columns)}
            </Table>
          </div>
        )
      }
    )
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys) //id du user sélectioné s'ajoute dans le tableau
    updateSelectedData(newSelectedRowKeys) // update du tableau idUser a archiver (update du state dans userScreen)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  return (
    <div className="component table-layout">
      <header>
        {/* Contenu du header gauche */}
        {renderSearchBar('top')}

        {/* Boutons */}
        {renderButtons('top')}
      </header>
      <main>
        {/* Tableaux */}
        {renderTables()}
      </main>

      <footer>
        {/* Barre de recherche */}
        {renderSearchBar('bottom')}

        {/* Boutons */}
        {renderButtons('bottom')}
      </footer>
    </div>
  )
}

TableLayout.propTypes = {
  onChangeSearch: PropTypes.func,
  buttons: PropTypes.object,
  buttonsPosition: PropTypes.string,
  tables: PropTypes.object,
  loading: PropTypes.bool,
  navigation: PropTypes.object,
  titleEnabled: PropTypes.bool,
  search: PropTypes.object,
  searchEnabled: PropTypes.bool,
  searchPosition: PropTypes.string,
  searchFilterFields: PropTypes.arrayOf(PropTypes.string),
  updateSelectedData: PropTypes.func,
  allowSelection: PropTypes.bool,
  importExcelFile: PropTypes.func,
}

TableLayout.defaultProps = {
  buttons: {},
  buttonsPosition: 'top',
  tables: {},
  loading: false,
  titleEnabled: true,
  search: {
    onChange: () => {},
    immediate: true,
  },
  searchEnabled: true,
  searchPosition: 'top',
  searchFilterFields: [],
  allowSelection: false,
}

export default withNavigation(TableLayout)
