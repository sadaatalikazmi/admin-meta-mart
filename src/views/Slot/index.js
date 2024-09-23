import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import './index.css';
import EnhancedTable from '../../components/table';
import { getAllRacks } from '../../store/actions/Rack';
import { getAllShelves, getRackShelves } from '../../store/actions/Shelf';
import { addSlot, getAllSlots, deleteSlot, updateSlot, setPlaceManyProducts } from '../../store/actions/Slot';
import { getProductCategories, getAllProducts, togglePlaceProductModal } from '../../store/actions/Product';
import ImportDataModal from '../../components/Modal/index';

const Slot = props => {

  const initialFilters = {
    rack: null,
    shelf: null,
    rackObj: null,
    shelfObj: null
  }

  // STATES
  const [selected, setSelected] = React.useState([]);
  const [state, setState] = useState({
    formData: {
      shelfId: '',
      axisX: '',
      axisY: '',
      axisZ: '',
      slotNo: '',
      type: '',
      selectedSlot: null,
      productCategory: '',
      isDeleteSlotModal: false,
      rackId: '',
    },
    slot: '',
    productCategory: {},
    categoriesProduct: {},
    product: {
      name: 'Select Product',
      id: 0
    },
    title: '',
    image: '',
    isViewScreenshotModal: false,
    inputValue: ''
  });
  const [category, setCategory] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState(initialFilters);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!selected.length) setSelectedCategories([])
    let cats = props.allSlots.filter(el =>
      selected.includes(el.id)
    ).map(el =>
      el.shelfId && el.shelfId.rack && el.shelfId.rack.category
    ).filter(el => !!el);
    cats = [...new Set(cats)]
    setSelectedCategories(cats)
  }, [selected])

  useEffect(() => {
    if (!props.productCategories || props.productCategories.length === 0) props.getProductCategories();
  }, [props.productCategories]);

  useEffect(() => {
    if (props.allRacks && props.allRacks.length === 0) props.getAllRacks();
  }, [props.allRacks]);

  useEffect(() => {
    if (props.allShelves && props.allShelves.length === 0) props.getAllShelves();
  }, [props.allShelves]);

  useEffect(() => {
    if (props.allProducts && props.allProducts.length === 0) props.getAllProducts();
  }, [props.allProducts]);

  useEffect(() => {
    if (props.allSlots && props.allSlots.length === 0) props.getAllSlots();
  }, [props.allSlots]);

  useEffect(() => {
    setFilteredSlots(props.allSlots)
  }, [props.allSlots]);

  useEffect(() => {
    if (!category) return setFilteredSlots(props.allSlots);
    setFilteredSlots(props.allSlots.filter(el =>
      el.shelfId && el.shelfId.rack && el.shelfId.rack.category &&
      el.shelfId.rack.category.toLowerCase().includes(category.toLowerCase())))

  }, [category]);

  useEffect(() => {
    setFilteredSlots(props.allSlots.filter(el => {
      if (!el.shelfId || !el.shelfId.rack) return false;
      if (filter.rack) {
        if (filter.shelf) {
          if (!el.shelfId || !el.shelfId.rack) return false;

          return ((el.shelfId.rack.id === filter.rack) && (el.shelfId.id === filter.shelf))
        }
        if (!el.shelfId || !el.shelfId.rack) return false;
        return el.shelfId.rack.id === filter.rack
      }

      if (!el.shelfId) return false;
      if (filter.shelf) return el.shelfId.id === filter.shelf
      setCategory();
      return true
    }))
  }, [filter]);

  // PLACING PRODUCT
  const handlePlacingProduct = () => {
    let { slot, product } = state;
    let data = { slotIds: slot, productId: product ? product.id : null };
    props.setPlaceManyProducts({
      data,
      successCallback: () => {
        setFilter(initialFilters)
        setSelected([])
      }
    });
    props.togglePlaceProductModal(false);
  };

  // SUBMIT DELETE SLOT
  const submitDeleteSlot = () => {
    const { selectedSlot } = state;
    props.deleteSlot(selectedSlot);
    setState({ isDeleteSlotModal: false });
  };

  // CANCEL DELETE SLOT
  const cancelDeleteSlot = () => {
    setState({ isDeleteSlotModal: false });
  };

  // SUBMIT PLACE PRODUCT
  const handleEditSubmit = event => {
    event.preventDefault();
    const { product } = state;
    props.placeProduct({
      slotIds: selected.map(el => el.id),
      productId: product
    });
    setState(st => ({
      ...st,
      product: {
        name: 'Select Product',
        id: 0
      }
    }));
    props.toggleEditProductModal(false);
  };

  // TOGGLE MODAL
  const toggleViewScreenshotModal = (title = 'Image', img) => {
    setState(st => ({
      ...st,
      title,
      image: img,
      isViewScreenshotModal: !state.isViewScreenshotModal
    }))
  };

  // RACK FILTERS
  const handleRackFilterClick = async obj => {
    if (!obj) setCategory()
    setFilter(st => ({ ...st, rack: obj.id, rackObj: obj, shelf: null, shelfObj: null }))
    if (obj) props.getRackShelves(obj.id)
  };

  // SHELF FILTERS
  const handleShelfFilterClick = async obj => setFilter(st => ({ ...st, shelf: obj.id, shelfObj: obj }))

  // PLACE PRODUCT
  const handlePlaceProducts = ids => {
    setState(st => ({ ...st, slot: ids }));
    props.togglePlaceProductModal(true)
  };

  const { isDeleteSlotModal } = state;
  const { allProducts, isPlaceProductModal } = props;

  // SLOTS TABLE COLUMNS
  const columns = [
    {
      label: 'Category',
      accessor: 'shelfId.rack.category',
      id: 'category'
    },
    {
      label: 'Rack Name',
      accessor: 'shelfId.rack.name',
      id: 'name'
    },
    {
      label: 'Shelf Name',
      accessor: 'shelfId.name',
      id: 'shelfName'
    },
    {
      label: 'Slot Number',
      accessor: 'slotNo',
      id: 'slotNo'
    },
    {
      label: 'Product Name',
      accessor: 'productId.name',
      id: 'productName'
    },
    {
      label: 'Product Price',
      accessor: 'productId.price',
      id: 'productPrice'
    },
    {
      label: 'Product Image',
      accessor: 'productId.imageUrl',
      id: 'productImage',
      toolTip: 'View Image',
      onClick: (row) => toggleViewScreenshotModal('Product Image', row.productId.imageUrl)

    },
    {
      label: 'Rack Image',
      accessor: 'shelfId.rack.image',
      id: 'shelfId.rack.image',
      toolTip: 'View Image',
      onClick: (row) => toggleViewScreenshotModal('Rack Image', row.shelfId.rack.image)
    }
  ];


  return (
    <div className='content'>
      <div className='main-container mintedNFT'>
        {/* CSV DOWNLOAD */}
        <div className='top-heading-area'>
          <h3>All Slots</h3>
          <div className='btn-group'>
            <CSVLink data={filteredSlots} >
              <button className="btn-style-one">Export Data</button>
            </CSVLink>
            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />

          </div>
        </div>

        <Fragment>
          <div className='main-container-head mb-3'>
            {/* PLACE PRODUCT TABLE */}
            <EnhancedTable
              rows={filteredSlots}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
              count={filteredSlots.length}
              showCheckbox
              selectButton={
                (selected.length) ?
                  <button
                    disabled={!(selected.length)}
                    className='btn-style-one'
                  >
                    Place Product
                  </button> : <></>
              }
              fetching={props.fetching}
              selectAction={handlePlaceProducts}
              showFilters
              filters={[
                {
                  label: 'Category',
                  name: 'category',
                  value: category,
                  type: 'text',
                  id: 'shelfId.rack.category',
                  handleChange: (e) => {
                    setCategory(e.target.value)
                  }
                },
                {
                  label: 'Racks',
                  options: props.allRacks || [],
                  accessor: 'shelfId.rack.name',
                  id: 'shelfId.rack.name',
                  handleChange: handleRackFilterClick,
                  type: 'autocomplete',
                  value: filter.rackObj
                },
                {
                  label: 'Shelf',
                  type: 'autocomplete',
                  options: props.allShelves || [],
                  accessor: 'shelfId.name',
                  id: 'shelfId.name123',
                  handleChange: handleShelfFilterClick,
                  value: filter.shelfObj
                }
              ]}


            />
          </div>
        </Fragment>
      </div >

      {/* ---------------PLACE PRODUCT MODAL--------------- */}

      < Modal
        isOpen={isPlaceProductModal}
        toggle={() => props.togglePlaceProductModal(false)}
        className='main-modal add-modal'
      >
        <ModalHeader toggle={() => props.togglePlaceProductModal(false)}>
          <div className='text-center'>
            <h2>Place Product</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleEditSubmit}>
            <div className='row'>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group pl-4'>
                  <label htmlFor='categoriesProduct'>Product</label>
                  <Autocomplete
                    value={state.product}
                    onChange={(event, newValue) => {
                      setState(st => ({
                        ...st,
                        product: newValue
                      }));
                    }}
                    defaultValue={{
                      name: 'Select Product'
                    }}
                    getOptionLabel={option => option.name}
                    inputValue={state.inputValue}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        inputValue: newInputValue
                      }));
                    }}
                    id='controllable-states-demo'
                    options={allProducts.filter(el => {
                      return selectedCategories.includes(el.type);
                    })}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-12'>
                <div className='form-group text-center'>
                  <Button
                    onClick={handlePlacingProduct}
                    className='submit-btn mt-4'
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal >

      {/* ---------------DELETE CONFIRMATION MODAL--------------- */}

      < Modal
        isOpen={isDeleteSlotModal}
        toggle={() => props.toggleDeleteSlotModal(false)}
        className='main-modal add-modal'
      >
        <ModalHeader
          toggle={() => setState({ isDeleteSlotModal: false })}
        ></ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleEditSubmit}>
            <div className='text-center'>
              <h2>DELETE SLOT</h2>
              <p className='delete-text'>
                Are you sure you want to delete this slot?
              </p>
            </div>
            <div className='row'>
              <div className='buttons'>
                <div className='form-group text-center'>
                  <Button
                    className='btn-edit mt-4 mr-4'
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      fontWeight: 'normal',
                      fontSize: '12px'
                    }}
                    onClick={submitDeleteSlot}
                  >
                    Yes
                  </Button>
                </div>
                <div className='form-group text-center'>
                  <Button
                    className='btn-edit mt-4'
                    style={{
                      marginLeft: '10px',
                      color: 'white',
                      fontWeight: 'normal',
                      fontSize: '12px'
                    }}
                    onClick={cancelDeleteSlot}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>



      {/* ---------------Screenshot MODAL--------------- */}

      <Modal
        isOpen={state.isViewScreenshotModal}
        toggle={() => toggleViewScreenshotModal('', '')}
        className='main-modal add-modal'
      >
        <ModalHeader toggle={() => toggleViewScreenshotModal('', '')}>
          <div className='text-center'>
            <h2>{state.title}</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <div className='img-box text-center'>
            <img
              src={state.image || require('../../assets/img/place-img.png')}
              alt='Rack Screenshot'
              style={{
                width: 400,
                height: 400,
                objectFit: 'contain',
                margin: '0 auto'
              }}
            />
          </div>
        </ModalBody>
      </Modal>
    </div >
  );
};

const mapDispatchToProps = {
  addSlot,
  getAllSlots,
  getProductCategories,
  getAllProducts,
  getAllRacks,
  getAllShelves,
  deleteSlot,
  setPlaceManyProducts,
  updateSlot,
  togglePlaceProductModal,
  getRackShelves
};

const mapStateToProps = ({ Slot, Product, Rack, Shelf }) => {
  let { allSlots, fetching, count } = Slot;
  let { isPlaceProductModal, productCategories, allProducts } = Product;
  let { allRacks } = Rack;
  let { rackShelves } = Shelf;

  return { allSlots, isPlaceProductModal, allProducts, productCategories, allRacks, allShelves: rackShelves, fetching, count };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Slot));
