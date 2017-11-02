/**
 * Created by geekzwb on 2017/11/2.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Icon, DatePicker } from 'antd';
import moment from 'moment';

import HTTPUtil from '../../../utils/Http';

// components
import EditableTable from '../../../common/Table/EditableTable';

const {RangePicker} = DatePicker;

const DetailPage = styled.div`
  background: #fff;
  width: 100%;
  width: 100%;
  display: flex;
`;
const TableBox = styled.div`
  flex: 1;
  margin: 20px;
  .editable-row-text {
    padding: 5px;
  }
  .editable-row-operations a {
    margin-right: 10px;
  }
  .editable-add-btn {
    margin-bottom: 8px;
  }
`;

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 100,
  }, {
    title: '采购标识',
    dataIndex: 'name',
    width: 100,
  }, {
    title: '送货单号',
    dataIndex: 'deliveryCode',
    width: 100,
  }, {
    title: '品名',
    dataIndex: 'productName',
    width: 100,
  }, {
    title: '编号',
    dataIndex: 'sku',
    width: 100,
  }, {
    title: '数量',
    dataIndex: 'count',
    width: 50,
  }, {
    title: '单价',
    dataIndex: 'price',
    width: 50,
  }, {
    title: '金额',
    dataIndex: 'totalCost',
    width: 100,
  }, {
    title: '发票日期',
    dataIndex: 'invoice_date',
    width: 100,
  }, {
    title: '发票号码',
    dataIndex: 'invoice_code',
    width: 100,
  }, {
    title: '发票金额',
    dataIndex: 'invoice_amount',
    width: 100,
  }, {
    title: '快递费',
    dataIndex: 'delivery_amount',
    width: 100,
  }, {
    title: '单次采购产品花费',
    dataIndex: 'purchaseCost',
    width: 150,
  }, {
    title: '欠款',
    dataIndex: 'arrears',
    width: 100,
  }, {
    title: '备注',
    dataIndex: 'note',
  }
];

class SupplierDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierId: this.props.match.params.supplierId,
      dataSource: [],
      loading: true
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.requestSupplier = this.requestSupplier.bind(this);
  }

  onDateChange(date, dateString) {
    this.requestSupplier({
      fromDate: dateString[0],
      toDate: dateString[1],
    });
  }

  componentDidMount() {
    this.requestSupplier();
  }

  /**
   *
   * @param data
   */
  requestSupplier(data={}) {
    HTTPUtil.post(`analysis/supplier/${this.state.supplierId}`, data).then((res) => {
      if (res.status === 'success') {
        this.setState({
          dataSource: this.initProducts(res.data),
          loading: false
        });
      }
    }).catch((err) => {
      console.log('err', err);
    })
  }

  /**
   *  返回一个 antd table 的 data source
   * @param data
   * @returns {Array}
   */
  initProducts(data) {
    let tableProducts = [];
    data.forEach((item) => {
      const {
        name,
        delivery_code,
        invoice_date,
        invoice_code,
        invoice_amount,
        delivery_amount,
        arrears,
        note,
        created_at,
        purchaseCost
      } = item;

      const pds = item.products.map((product, index) => {
        return {
          key: product.id,
          date: {
            value: index !== 0 ? '' : created_at.substr(0, 10)
          },
          name: {
            value: index !== 0 ? '' : name
          },
          deliveryCode: {
            value: index !== 0 ? '' : delivery_code
          },
          productName: {
            value: product.name
          },
          sku: {
            value: product.sku
          },
          count: {
            value: product.pivot.count
          },
          price: {
            value: product.pivot.price
          },
          totalCost: {
            value: product.pivot.price * product.pivot.count
          },
          invoice_date: {
            value: index !== 0 ? '' : invoice_date
          },
          invoice_code: {
            value: index !== 0 ? '' : invoice_code
          },
          invoice_amount: {
            value: index !== 0 ? '' : invoice_amount
          },
          delivery_amount: {
            value: index !== 0 ? '' : delivery_amount
          },
          purchaseCost: {
            value: index !== 0 ? '' : purchaseCost
          },
          arrears: {
            value: index !== 0 ? '' : arrears
          },
          note: {
            value: index !== 0 ? '' : note
          }
        }
      });

      tableProducts = tableProducts.concat(pds);
    });

    return tableProducts;
  }

  render() {
    const $$supplier = this.props.$$suppliers.find(($$sp) => {
      return $$sp.get('id') + '' === this.state.supplierId;
    });

    const supplier = ($$supplier && $$supplier.toJS()) || {};

    const dateFormat = 'YYYY-MM-DD';
    const date = new Date();
    const from = `${date.getFullYear()}-01-01`;
    const to = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return (
      <DetailPage>
        <TableBox>
          <div style={{marginBottom: '20px'}}>
            <Button style={{float: 'right'}}>
              <Link to='/suppliers'>
                <Icon type="rollback"/>
              </Link>
            </Button>
            <h2 style={{fontSize: '20px', fontWeight: 600, textAlign: 'center'}}>{new Date().getFullYear()}
              年 {supplier.name} 供 货 情 况 明 细 表</h2>
            <div>
              <RangePicker
                defaultValue={[moment(from, dateFormat), moment(to, dateFormat)]}
                format={dateFormat}
                onChange={this.onDateChange}
              />
            </div>
          </div>

          <EditableTable
            pagination={false}
            scroll={{x: '150%', y: '100%'}}
            columns={columns}
            data={this.state.dataSource}
            loading={this.state.loading}
            handleTableChange={() => {
            }}
            handleChange={() => {
            }}
            deleteOne={() => {
            }}
          />
        </TableBox>
      </DetailPage>
    );
  };
}

SupplierDetail.propTypes = {
  $$suppliers: PropTypes.object.isRequired //List
};

export default SupplierDetail;