import jwt_decode from 'jwt-decode';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { Edit } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Autocomplete, IconButton, TextField } from '@mui/material';

import './index.css';
import SubmitButton from '../../components/Button';
import EnhancedTable from '../../components/table';
import { getAllProducts } from '../../store/actions/Product';
import { addRack, updateRack, placeProduct } from '../../store/actions/Rack';
import { getAllRacks, deleteRacks, toggleDeleteRackModal } from '../../store/actions/Rack';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImportDataModal from '../../components/Modal/index'

const Rack = (props) => {

  // STATES
  const [state, setState] = useState({
    inputValueCategory: '',
    inputValueType: '',
    isAddProductModal: false,
    image: '',
    formData: {
      name: '',
      description: '',
      category: '',
      type: '',
      image: null,
      rackImage: null,
      selectedRack: null,
      isDeleteRackModal: false,
      isViewScreenshotModal: false
    },
    product: {
      name: 'Select Product',
      id: 0
    },
    inputValue: '',
    rackId: null
  });

  const [selected, setSelected] = useState([]);
  const [formImage, setFormImage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [filteredRacks, setFilteredRacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaceProductModal, setIsPlaceProductModal] = useState(false)
  const [filters, setFilters] = useState({ name: '', type: '', category: '' });

  useEffect(() => {
    setFilteredRacks(props.allRacks || []);
  }, [props.allRacks]);

  useEffect(() => {
    if (props.allRacks && props.allRacks.length === 0)
      props.getAllRacks();
  }, [props.allRacks]);

  useEffect(() => {
    if (!props.allRacks) return;
    setFilteredRacks(props.allRacks.filter(el => {
      let condition = true;
      if (filters.name) condition = condition && el.name.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.type) condition = condition && el.type.toLowerCase().includes(filters.type.toLowerCase())
      if (filters.category) condition = condition && el.category.toLowerCase().includes(filters.category.toLowerCase())
      return condition;
    }))
  }, [filters])

  useEffect(() => {
    if (props.allProducts && props.allProducts.length === 0) props.getAllProducts();
  }, [props.allProducts]);

  // SUBMIT ADD RACK
  const handleSubmit = async () => {
    const { selectedRack } = state;
    const { name, description, category, type, sizeX, sizeY, sizeZ, isDeleteRackModal, image } = state.formData;

    if (!['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat'].includes(category)) return toast.error("Invalid category")
    if (!['6 Shelf Rack', '3 Shelf Rack', 'Table', 'Stall', 'Fridge'].includes(type)) return toast.error("Invalid type")

    const formData = new FormData()
    formData.append("name", name);
    formData.append("type", type);
    formData.append("sizeX", sizeX);
    formData.append("sizeY", sizeY);
    formData.append("sizeZ", sizeZ);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("isDeleteRackModal", isDeleteRackModal);

    setIsSubmitting(true)
    if (selectedRack === '' || selectedRack === null || selectedRack === undefined) {
      formData.append("image", image)
      props.addRack({
        successCallback: () => {
          setSelected([])
          setState(st => ({ ...st, isRackModal: false }));
          setIsSubmitting(false)
        },
        failCallBack: () => {
          setIsSubmitting(false)
        },
        formData: formData
      });
    }
    else {
      if (formImage) formData.append("image", image)
      props.updateRack(
        {
          successCallback: () => {
            setSelected([])
            setState(st => ({ ...st, isRackModal: false }))
            setIsSubmitting(false)
          },
          failCallBack: () => {
            setIsSubmitting(false)
          },
          formData: formData,
          id: state.selectedRack && state.selectedRack._id
        });
    }
  };

  // EIDT INPUT FIELD
  const handleChange = event => setState(prevState => ({ ...prevState, formData: { ...prevState.formData, [event.target.name]: event.target.value } }));

  // EIDT IMAGE CHANGE
  const handleImageChange = event => {
    const image = event.target.files[0];
    if (!image) return;
    const maxSizeInBytes = 1 * 1024 * 1024;     // 3.5 MB

    setState(st => ({ ...st, image: event.target.files[0] }));

    if (image.size > maxSizeInBytes)
      return toast.error(`File size must be less than 1Mb`);

    if (!image.name.includes('png') && !image.name.includes('jpg') && !image.name.includes('jpeg'))
      return toast.error(`Only jpg, png image is allowed`);

    const rackImage = event.target.files[0]
    if (rackImage) {
      setState(st => ({
        ...st,
        rackImage: URL.createObjectURL(rackImage)
      }));
    }
    const reader = new FileReader();
    reader.onload = e => {
      const imageUrl = e.target.result;
      setFormImage(imageUrl)
      setState(prevState => ({ ...prevState, formData: { ...prevState.formData, image: image } }));
    };
    reader.readAsDataURL(image);
  };

  // TOGGLE RACK MODAL
  const toggleAddRackModal = () => {
    setState(prevState => ({
      ...prevState,
      isRackModal: !prevState.isRackModal,
      selectedRack: null,
      formData: {
        name: '',
        description: '',
        category: '',
        type: '',
        image: '',
        isDeleteRackModal: false
      }
    }));
  };

  // SET EDIT RACK
  const editRack = rack => {
    setState(st => (
      {
        ...st,
        selectedRack: rack,
        inputValueCategory: rack.category,
        inputValueType: rack.type,
        formData: { ...rack },
        isRackModal: true
      }));
  };

  // SUBMIT DELETE RACK
  const submitDeleteRack = () => {
    const { selectedRack } = state;
    props.deleteRacks(selectedRack);
    setState(st => ({ ...st, isDeleteRackModal: false }));
  };

  // CANCEL DELETE RACK
  const cancelDeleteRack = () => setState(st => ({ ...st, isDeleteRackModal: false }));
  const togglePlaceProductModal = () => setIsPlaceProductModal(st => !st);
  const toggleViewScreenshotModal = (img) => setState(st => ({ ...st, image: img, isViewScreenshotModal: !state.isViewScreenshotModal }));

  // PLACE PRODUCT
  const handlePlaceProducts = ids => {
    setState(st => ({ ...st, slot: ids }));
    togglePlaceProductModal();
  };
  const handlePlacingProduct = () => {
    props.placeProduct({
      formData: { productId: state.product },
      id: state.rackId,
      successCallback: () => {
        togglePlaceProductModal(false);
      },
      failCallBack: () => { }
    })
  };

  const { formData, isRackModal, isDeleteRackModal } = state;
  const { isLoading } = props;
  const { name, description } = formData;
  let { isViewScreenshotModal } = state;

  // RACK TABLE COLUMNS
  const columns = [
    {
      label: 'Rack Name',
      accessor: 'name',
      id: 'name',
      key: 'rackName'
    },
    {
      label: 'Rack Type',
      accessor: 'type',
      id: 'type',
      key: 'rackType'
    },
    {
      label: 'Rack Category',
      accessor: 'category',
      id: 'category',
      key: 'rackCategory'
    },
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT'>
        <div className='top-heading-area'>
          <h3>All Rack</h3>
          <div className='btn-group'>
            <CSVLink data={filteredRacks} >
              <button className="btn-style-one">Export Data</button>
            </CSVLink>
            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
            {props.role === 'super-admin' &&
              <button onClick={toggleAddRackModal} className='btn-style-one'> Add Rack</button>
            }
          </div>
        </div>
        <Fragment>
          <div className='main-container-head mb-3'>
            {/* RACK TABLE */}
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <EnhancedTable
                rows={filteredRacks}
                selected={selected}
                setSelected={setSelected} columns={columns}
                fetching={props.fetching}
                count={filteredRacks.length}
                showActions
                showPagination={true}
                actions={[
                  {
                    component: <IconButton size='small'>
                      <button className='btn-style-one'>
                        <ImageIcon fontSize='small' /> View
                      </button>
                    </IconButton>,
                    onClick: (row) => toggleViewScreenshotModal(row.image)
                  },
                  {
                    component:
                      props.role === 'super-admin' &&
                      <IconButton size='small'>
                        <Edit fontSize='small' />
                      </IconButton>
                    ,
                    onClick: (row) => editRack(row)
                  },
                  {
                    component:
                      <button className='btn-style-two'>
                        Place Product
                      </button>,
                    onClick: row => {
                      setState(st => ({ ...st, rackId: row.id, selectedCategory: row.category }))
                      handlePlaceProducts()
                    }
                  }

                ]}
                showFilters
                filters={[
                  {
                    label: 'Name',
                    name: 'name',
                    value: filters.name,
                    type: 'text',
                    id: 'shelfId.rack.name',
                    handleChange: (e) => {
                      setFilters(st => ({
                        ...st, [e.target.name]: e.target.value
                      }))
                    }
                  },
                  {
                    label: 'Type',
                    name: 'type',
                    value: filters.type,
                    type: 'text',
                    id: 'shelfId.name',
                    handleChange: (e) => {
                      setFilters(st => ({
                        ...st, [e.target.name]: e.target.value
                      }))
                    }
                  },
                  {
                    label: 'Category',
                    name: 'category',
                    value: filters.category,
                    type: 'text',
                    id: 'shelfId.name',
                    handleChange: (e) => {
                      setFilters(st => ({
                        ...st, [e.target.name]: e.target.value
                      }))
                    }
                  }
                ]}

              />
            )}
          </div>
        </Fragment>
      </div>

      {/* ---------------ADD RACK MODAL--------------- */}
      <Modal isOpen={isRackModal} toggle={toggleAddRackModal} className='main-modal Product-modal'>
        <ModalHeader toggle={() => setState(st => ({ ...st, isRackModal: false, selectedRack: null }))}>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Rack Name:</label>
                  <TextField
                    id='name'
                    name='name'
                    value={name}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    style={{ marginTop: '1rem' }}
                    required={true}
                    errorMessages={['Name is required']}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>Description:</label>

                  <TextField
                    id='description'
                    name='description'
                    value={description}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    required={true}
                    errorMessages={['Description is required']}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='category'>Category:</label>
                  <Autocomplete
                    value={state.formData.category || ''}
                    onChange={(event, newValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          category: newValue || ''
                        }
                      }));
                    }}
                    getOptionLabel={option => option || ''}
                    inputValue={state.formData.category}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          category: newInputValue || ''
                        }
                      }));
                    }}
                    required={true}
                    id='controllable-states-demo'
                    options={['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat']}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='type'>Type:</label>
                  <Autocomplete
                    required={true}
                    value={state.formData.type || ''}
                    onChange={(event, newValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          type: newValue || ''
                        }
                      }));
                    }}
                    getOptionLabel={option => option || ''}
                    inputValue={state.formData.type}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        formData: {
                          ...st.formData,
                          type: newInputValue || ''
                        }
                      }));
                    }}
                    id='controllable-states-demo'
                    options={[
                      "Stall",
                      "Table",
                      "Fridge",
                      "6 Shelf Rack",
                    ]}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-12'>
                <div className='form-group'>
                  <label htmlFor='image'>Image:</label>
                  <div className='img-upload-area'>
                    <div className='img-box'>
                      <img
                        src={formImage ? formImage : state.selectedRack ? state.selectedRack.image : require('../../assets/img/place-img.png')}
                        alt=''
                      />
                    </div>
                    <div className='text-box'>
                      <h5>Select a file or drag and drop here</h5>
                      <p>JPG , PNG or SVG file size no more then 1MB</p>
                      <div className='input-file'>
                        <input
                          type='file'
                          id='image'
                          name='image'
                          accept='image/*'
                          onChange={handleImageChange}
                          className='form-control'
                          required={!Boolean(state.selectedRack)}
                        />
                        <span className='add-btn'>Select File</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='form-group text-center'>
                  <SubmitButton className="add-btn" loading={isSubmitting} />
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      {/* ---------------DELETE CONFIRMATION MODAL--------------- */}
      <Modal isOpen={isDeleteRackModal} toggle={() => props.toggleDeleteRackModal(false)} className='main-modal add-modal'>
        <ModalHeader toggle={() => setState(st => ({ ...st, isDeleteRackModal: false }))}></ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form'>
            <div className='text-center'>
              <h2>DELETE RACK</h2>
              <p className='delete-text'>
                Are you sure you want to delete this rack?
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
                    onClick={submitDeleteRack}>
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
                    onClick={cancelDeleteRack}>
                    No
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      {/* ---------------SCREENSHOT MODAL--------------- */}
      <Modal isOpen={isViewScreenshotModal} toggle={toggleViewScreenshotModal} className='main-modal add-modal'>
        < ModalHeader toggle={() => toggleViewScreenshotModal(false)}>
          <div className='text-center'>
            <h2>Rack Image</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <div className='img-box'>
            <LazyLoadImage src={state.image || require('../../assets/img/place-img.png')} alt='Rack Screenshot' />
          </div>
        </ModalBody>
      </Modal>

      {/* ---------------PLACE PRODUCT MODAL--------------- */}
      <Modal isOpen={isPlaceProductModal} toggle={() => togglePlaceProductModal(false)} className='main-modal add-modal'>
        <ModalHeader toggle={() => togglePlaceProductModal(false)}>
          <div className='text-center'>
            <h2>Place Product</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' id='new-form' onSubmit={handlePlacingProduct}>
            <div className='row'>
              <div className='col-lg-6 offset-lg-3 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='categoriesProduct'>Product:</label>
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
                    id='controllable-states-demo2'
                    options={props.allProducts.filter(el => el.type === state.selectedCategory)}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-12'>
                <div className='form-group text-center'>
                  <button
                    onClick={handlePlacingProduct}
                    className='btn-style-one mt-4'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal >

    </div>
  );
};

const mapDispatchToProps = {
  addRack,
  getAllRacks,
  deleteRacks,
  updateRack,
  toggleDeleteRackModal,
  getAllProducts,
  placeProduct
};

const mapStateToProps = ({ Rack, Product, Auth }) => {
  let { auth: token } = Auth;
  let role;
  try {
    const decoded = jwt_decode(token)

    role = decoded['role']
  }
  catch (e) {
  }
  let { allRacks, count, fetching } = Rack;
  let { allProducts } = Product;
  return { allRacks, count, fetching, allProducts, role };
};
export default connect(mapStateToProps, mapDispatchToProps)(Rack);
