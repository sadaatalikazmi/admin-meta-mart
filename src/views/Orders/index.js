import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IconButton } from '@mui/material';
import { Cancel, Check } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import './index.css';
import EnhancedTable from '../../components/table';
import { toggleModal } from '../../store/actions/Auth';
import { getAllOrders, setAllOrders, setStatus } from '../../store/actions/Order';
import ImportDataModal from '../../components/Modal/index'

const Orders = (props) => {

  // States
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [state, setState] = useState({ status: 'In Progress', selectedOrder: null });
  const [deleteState, setDeleteState] = useState({ open: false, orderId: null, status: null });
  const [filters, setFilters] = useState({ orderNumber: '', name: '', customerId: '', email: '', totalAmount: '', status: '', gender: '' });

  useEffect(() => {
    setFilteredOrders(props.allOrders || []);
  }, [props.allOrders]);

  useEffect(() => {
    if (!props.allOrders) return;
    setFilteredOrders(props.allOrders.filter(el => {
      let condition = true;

      if (filters.name) condition = condition && el.userId && el.userId.username && el.userId.username.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.gender) condition = condition && el.userId && el.userId.gender && el.userId.gender.toLowerCase() === filters.gender.toLowerCase()
      if (filters.customerId) condition = condition && el.userId && el.userId.id.toString().includes(filters.customerId.toString())
      if (filters.email) condition = condition && el.userId && el.userId.email && el.userId.email.toLowerCase().includes(filters.email.toLowerCase())
      if (filters.totalAmount) condition = condition && el.totalAmount.includes(filters.totalAmount)
      if (filters.orderNumber) condition = condition && el.orderNumber == filters.orderNumber
      if (filters.status) condition = condition && el.status && el.status.toLowerCase().includes(filters.status.toLowerCase())
      return condition;
    }))
  }, [filters]);

  useEffect(() => {
    if (props.allOrders && props.allOrders.length === 0)
      props.getAllOrders();
  }, [props.allOrders]);

  // Toggle Modal
  const handleClose = () => setDeleteState(st => ({ ...st, open: false }));

  // Submit Delete  Order
  const handleDelete = () => {
    changeStatus(deleteState.orderId, deleteState.status);
    setDeleteState({
      open: false,
      orderId: null,
      status: null
    })
  };

  // Set Status Change
  const handleStatusChange = (orderId, selectedStatus) => {
    if (['CANCELLED', 'ONHOLD'].includes(selectedStatus)) {
      setDeleteState({
        open: true,
        orderId: orderId,
        status: selectedStatus
      })
    }
    else changeStatus(orderId, selectedStatus)
  };

  // Submit Status Change
  const changeStatus = (orderId, selectedStatus) => {
    const updatedOrders = props.allOrders.map(order => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: selectedStatus
        };
      }
      return order;
    });
    props.setStatus({ orderId, selectedStatus });
    props.setAllOrders({ data: updatedOrders });
  };

  // Set Products for View
  const viewProducts = (order) => {
    setState({ selectedOrder: order });
    props.toggleModal(true);
  };

  const { isModal } = props;
  const { selectedOrder } = state;

  // ORDER TABLE COLUMNS
  const orderColumns = [
    {
      label: 'Order ID',
      accessor: 'orderNumber',
      id: 'orderNumber'
    },
    {
      label: 'Customer Name',
      accessor: 'userId.username',
      id: 'userId.username',
      filterable: true
    },
    {
      label: 'Customer ID',
      accessor: 'userId.id',
      id: 'customerId',
      filterable: true
    },
    {
      label: 'Email',
      accessor: 'userId.email',
      id: 'userId.email',
      filterable: true
    },
    {
      label: 'Gender',
      accessor: 'userId.gender',
      id: 'userId.gender',
      filterable: true
    },
    {
      label: 'Total Amount',
      accessor: 'totalAmount',
      id: 'totalAmount'
    },
    {
      label: 'Date and time',
      accessor: 'createdAt',
      id: 'createdAt'
    }
  ];

  // PRODUCT TABLE COLUMNS
  const productColumns = [
    {
      label: 'Product Name',
      accessor: 'productId.name',
      id: 'productId.name'
    },
    {
      label: 'Quantity',
      accessor: 'quantity',
      id: 'quantity'
    },
    {
      label: 'Type',
      accessor: 'productId.type',
      id: 'type'
    },
    {
      label: 'Image',
      accessor: 'productId.imageUrl',
      id: 'image'
    },
    {
      label: 'Price',
      accessor: 'productId.price',
      id: 'price'
    },
  ];

  const products = selectedOrder ? selectedOrder['items'] || [] : [];
  const totalPrice = products.reduce((total, product) => {
    const productPrice = product.productId ? parseFloat(product.productId.price) * parseFloat(product.quantity) : 0;
    return total + productPrice;
  }, 0);

  const vatPercentage = selectedOrder ? parseFloat(selectedOrder.vat) : 0;

  const vat = totalPrice * (vatPercentage / 100);
  const vatValue = selectedOrder ? Math.round(selectedOrder.vat) : 0
  const netAmount = totalPrice + vat

  return (
    <div className='content'>
      <div className='main-container mintedNFT order-table-page'>
        {/* CSV DOWNLOAD */}
        <div className='top-heading-area'>
          <h3>All Orders</h3>
          <div className='btn-group'>
            <CSVLink data={filteredOrders.map(el => {
              let newObj = {
                id: el.orderId,
                status: el.status,
                user: el.userId ? el.userId.name : '-',
                amount: el.totalAmount,
                date: new Date(el.createdAt).toGMTString(),
                gender: el.userId ? el.userId.gender : '-',
                products: el.items.map(el => el.productId ? el.productId.name : '').join(',')
              }
              return newObj;
            })}>
              <button className="btn-style-one">Export Data</button>
            </CSVLink>
            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
          </div>
        </div>
        {/* OODER TABLE */}
        {/* {filteredOrders.length > 0 ? */}
        <EnhancedTable
          rows={filteredOrders}
          columns={orderColumns}
          count={filteredOrders.length}
          fetching={props.fetching}
          selected={selected}
          setSelected={setSelected}
          showActions
          className="order-table-page"
          actions={[{
            component:
              <Tooltip title={'View Details'}>
                <IconButton size='small'>
                  <VisibilityIcon fontSize='small' />
                </IconButton>
              </Tooltip>,
            onClick: row => viewProducts(row)
          }]}

          specialTableRows={[{
            accessor: 'Status',
            id: 'Status',
            type: 'orders',
            label: 'Status',
            onChange: handleStatusChange
          }]}
          showFilters
          filters={[
            {
              label: 'OrderNumber',
              name: 'orderNumber',
              value: filters.orderNumber,
              type: 'text',
              id: 'orderNumber.rack.name',
              handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
            },
            {
              label: 'Name',
              name: 'name',
              value: filters.name,
              type: 'text',
              id: 'name.name',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            },
            {
              label: 'Customer ID',
              name: 'customerId',
              value: filters.customerId,
              type: 'text',
              id: 'userId.id',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            },
            {
              label: 'Email',
              name: 'email',
              value: filters.email,
              type: 'text',
              id: 'userId.email',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            },
            {
              label: 'Gender',
              name: 'gender',
              value: filters.gender,
              type: 'text',
              id: 'userId.gender',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            },
            {
              label: 'TotalAmount',
              name: 'totalAmount',
              value: filters.totalAmount,
              type: 'text',
              id: 'totalAmount.name',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            },
            {
              label: 'Status',
              name: 'status',
              value: filters.status,
              type: 'text',
              id: 'status.name',
              handleChange: (e) => {
                setFilters(st => ({
                  ...st, [e.target.name]: e.target.value
                }))
              }
            }
          ]} />
        {/* // : <div className='main-container mintedNFT' style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >Orders not found</div>} */}

        {/* Change Status MODAL */}
        <Modal isOpen={deleteState.open} toggle={handleClose} className='main-modal add-modal'>
          <ModalHeader toggle={handleClose} style={{ zIndex: 1000 }}>
            <div className='text-center'>
              <h2>Confirmation</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className='group-form text-center py-3'>
              Are you sure you want to change the status?
            </div>
            <div className='group-form text-center mt-2 '>
              <button className='btn-style-two' onClick={handleClose} startIcon={<Cancel />}>
                Cancel
              </button>
              <button className='btn-style-one ml-3' onClick={handleDelete} startIcon={<Check />} >
                Yes
              </button>
            </div>
          </ModalBody>
        </Modal>


        <Modal isOpen={isModal} toggle={() => props.toggleModal(false)} className='main-modal add-modal'>
          <ModalHeader toggle={() => props.toggleModal(false)} style={{ zIndex: 1000 }}>
            <div className='text-center'>
              <h2>Order Details</h2>
            </div>
          </ModalHeader>

          <ModalBody sx={{ paddingBlock: 0 }}>
            <div className='row'>
              <div className='col-12'>
                {/* PRODUCT TABLE */}
                <EnhancedTable
                  rows={products}
                  columns={productColumns}
                  count={products.length}
                  showPagination={false}
                  selected={selected}
                  setSelected={setSelected}
                  specialTableRows={[{
                    accessor: 'Status',
                    id: 'totalprice',
                    type: 'orders',
                    label: 'Total Price'
                  }]}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right', marginRight: '10px', fontSize: '18px' }}>
                  <div className='labels'>
                    <span className="label">Total Price:</span>
                    <span className="label">VAT:</span>
                    <span className="label">Net Amount:</span>
                  </div>
                  <div className="values">
                    <span className="">${totalPrice.toFixed(2)}</span>
                    <span style={{ display: 'flex', alignItems: 'center' }}>${vat.toFixed(2)}
                      <span style={{ marginLeft: '2px', fontSize: '8px' }}>({vatValue}%)</span>
                    </span>

                    <span className="value">${netAmount.toFixed(2)}</span>
                  </div>
                </div>

              </div>
              <div className='col-12 mt-2 d-flex justify-content-around'></div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getAllOrders,
  setAllOrders,
  toggleModal,
  setStatus
};

const mapStateToProps = ({ Auth, Orders }) => {
  const { isModal, user } = Auth;
  const { allOrders, count, fetching } = Orders;
  return { allOrders, isModal, user, count, fetching };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
