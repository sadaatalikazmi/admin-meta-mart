import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
import { Edit, Cancel, Check } from '@mui/icons-material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import React, { useState, useEffect, Fragment } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Dialog, DialogActions, DialogContentText, DialogContent, Autocomplete, IconButton, TextField } from '@mui/material';

import './index.css';
import SubmitButton from '../../components/Button';
import EnhancedTable from '../../components/table';
import { setLoader } from '../../store/actions/Auth';
import { getShelfSlot } from '../../store/actions/Slot';
import ImportDataModal from '../../components/Modal/index'
import { getRackShelves } from '../../store/actions/Shelf';
import { addProduct, getAllProducts, deleteProduct, updateProduct, getProductQuantity, toggleEditProductModal, togglePlaceProductModal, toggleDeleteProductModal } from '../../store/actions/Product';

const Product = (props) => {

  // Filter
  const initialFilters = {
    name: '',
    quantity: '',
    price: '',
  }

  // States
  const [state, setState] = useState({
    isDelete: false,
    isDeleteProductModal: false,
    isAddProductModal: false,
    selectedProductId: '',
    product: '',
    name: '',
    rack: {},
    shelf: {},
    slot: {},
    description: '',
    quantity: '',
    price: '',
    type: '',
    slotId: '',
    category: '',
    productSize: '',
    productFiles: [],
    imageUrl: null,
    productImage: null,
    model: null,
    selectedProdct: null,
    image: null
  });
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [warningState, setWarningState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [redirectState, setRedirectState] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(props.allProducts || []);
  }, [props.allProducts])

  useEffect(() => {
    if (!props.allProducts) return;
    setFilteredProducts(props.allProducts.filter(el => {
      let condition = true;
      if (filters.name) condition = condition && el.name.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.quantity) condition = condition && +el.quantity === +filters.quantity
      if (filters.price) condition = condition && +el.price === +filters.price
      return condition;
    }))
  }, [filters])

  useEffect(() => {
    if (props.allProducts && props.allProducts.length === 0)
      props.getAllProducts();
  }, [props.allProducts]);

  useEffect(() => {
    if (!props.productQuantity)
      props.getProductQuantity();
    if (productQuantity && productQuantity.length > 0)
      setWarningState(true)
    else
      setWarningState(false)
  }, [props.productQuantity]);

  useEffect(() => {
    let { rack } = state;
    if (rack && rack['_id']) props.getRackShelves(rack['_id']);
  }, [state.rack]);

  useEffect(() => {
    let { shelf } = state;
    if (shelf && shelf['_id']) props.getShelfSlot(shelf['_id']);
  }, [state.shelf]);

  // Toggle Modal
  const toggleAddModal = () => {
    setState(st => ({
      ...st,
      isRackModal: false,
      isAddProductModal: false, setUploadSuccess: false, setUploadProgress: 0,
      name: '', description: '', quantity: '', price: '', type: '', slotId: '', productSize: '', imageUrl: null, category: '',
    }));
    setUploadSuccess(false);
  };

  // Edit Imput Fields
  const handleChange = event => setState(st => ({ ...st, [event.target.name]: event.target.value }));

  // Edit Image Change
  const handleImageChange = (event) => {
    const imageUrl = event.target.files[0]
    if (!imageUrl) return
    const maxSizeInBytes = 3.5 * 1024 * 1024;     // 3.5 MB
    setState(st => ({ ...st, imageUrl: event.target.files[0] }));
    if (imageUrl.size > maxSizeInBytes)
      return toast.error(`File size must be less than 3.5Mb`);

    if (!imageUrl.name.includes('png') && !imageUrl.name.includes('jpg') && !imageUrl.name.includes('jpeg'))
      return toast.error(`Only jpg, png files are allowed`);

    const productImage = event.target.files[0]
    if (productImage) setState(st => ({ ...st, productImage: URL.createObjectURL(productImage) }));
  };

  // Toggle Close
  const handleClose = () => setWarningState(false);

  // Set Redirect
  const handleRedirect = () => {
    setRedirectState(false);
    props.history.push('/home/slots')
  };

  // Set Redirect Close
  const handleRedirectClose = () => setRedirectState(false);

  // Set Model Change
  const handleModelChange = event => {
    const filee = event.target.files[0];
    if (!filee) return;
    const maxSizeInBytes = 1 * 1024 * 1024;
    setState(st => ({ ...st, model: event.target.files[0] }));
    if (filee.size > maxSizeInBytes) return toast.error(`File size must be less than 1Mb`);
    if (!filee.name.includes('glb')) return toast.error(`Only .glb files are allowed`);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploadSuccess(true);
          return 0;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  // Submit Add Product
  const handleSubmit = event => {
    event.preventDefault();
    const { name, description, quantity, price, type, model, imageUrl, productSize } = state;

    if (!['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat'].includes(type))
      return toast.error('Invalid type: ' + type)

    if (!["Small", "Medium", "Large",].includes(productSize))
      return toast.error('Invalid productSize: ' + productSize)

    setIsSubmitting(true);

    // Create form data to send to the server
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('productSize',
      productSize === 'Small' ? 1
        : productSize === 'Medium' ? 2
          : 3);
    if (model) formData.append('productFiles', model);
    if (imageUrl) formData.append('productFiles', imageUrl);

    props.addProduct({
      formData: formData,
      successCallback: () => {
        setSelected([])
        setFilters(initialFilters)
        setRedirectState(true)
        setState(st => ({
          ...st,
          name: '',
          description: '',
          quantity: '',
          price: '',
          type: '',
          category: '',
          productSize: '',
          imageUrl: null,
          productImage: null,
          model: null,
          image: null,
          isAddProductModal: false
        }));
        setIsSubmitting(false)
      },
      failCallBack: () => {
        setIsSubmitting(false)
      },
    });
    setState(st => ({ ...st, setUploadSuccess: false, setUploadProgress: 0 }));
  };

  // Submit Update Product
  const handleEditSubmit = event => {
    event.preventDefault();
    const { description, quantity, price, type, model, productSize, imageUrl, selectedProductId } = state;

    if (!['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat'].includes(type))
      return toast.error('Invalid type: ' + type)

    if (!["Small", "Medium", "Large",].includes(productSize))
      return toast.error('Invalid productSize: ' + productSize)

    const formData = new FormData();
    formData.append('type', type);
    formData.append('model', model); // Append the model file
    formData.append('imageUrl', imageUrl); // Append the image file
    setIsSubmitting(true);

    props.updateProduct({
      formData: {
        name, description, quantity, price, type, model, imageUrl, selectedProductId,
        productSize:
          productSize === 'Small' ? 1
            : productSize === 'Medium' ? 2
              : 3
      },
      successCallback: () => {
        setSelected([])
        setFilters(initialFilters)
        setState(st => ({
          ...st,
          name: '',
          description: '',
          quantity: '',
          price: '',
          type: '',
          category: '',
          productSize: '',
          imageUrl: null,
          productImage: null,
          model: null,
          image: null,
          selectedProdct: null
        }));
        props.getProductQuantity();
        if (productQuantity.length > 0) setWarningState(true);
        else setWarningState(false);
        props.toggleEditProductModal(false);
        setIsSubmitting(false);
      },
      failCallBack: () => {
        setIsSubmitting(false);
      },
    }
    );
  };

  // Submit Delete Product
  const submitDeleteProduct = () => {
    const { selectedProdct } = state;
    props.deleteProduct(selectedProdct);
    props.toggleDeleteProductModal(false);
  };

  // Cancel Delete Product
  const cancelDeleteProduct = () => {
    props.toggleDeleteProductModal(false);
  };

  // Set Edit Product
  const editProduct = (product) => {
    setWarningState(false)
    setState(
      st => ({
        ...st,
        quantity: product['quantity'],
        description: product['description'],
        price: product['price'],
        productSize: product['productSize'] === 1 ? "Small" : product['productSize'] === 2 ? "Medium" : "Large",
        type: product['type'],
        category: product['category'],
        selectedProductId: product['id'],
        selectedProdct: product,
        name: product['name']
      })
    );
    props.toggleEditProductModal(true)
  };

  const { isEditProductModal, isDeleteProductModal, productQuantity } = props;
  const { isAddProductModal, name, description, quantity, price, imageUrl, type, productImage, productSize } = state;

  // PRODUCT TABLE COLUMNS
  const columns = [
    {
      label: 'Product Name',
      accessor: 'name',
      id: 'name',
      key: 'productName'
    },
    {
      label: 'Product Quantity',
      accessor: 'quantity',
      id: 'quantity',
      key: 'productQuantity'
    },
    {
      label: 'Product Price',
      accessor: 'price',
      id: 'price',
      key: 'productPrice',
    },
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT'>
        {/* CSV DOWNLOAD */}
        <div className='top-heading-area'>
          <h3>All Products</h3>
          <div className='btn-group'>
            <CSVLink data={filteredProducts} >
              <button className="btn-style-one">Export Data</button>
            </CSVLink>

            <button onClick={() => setOpenModal(true)} className="btn-style-one">
              Import Data
            </button>
            <ImportDataModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
            <button onClick={() => setState(st => ({ ...st, isAddProductModal: true }))} className='btn-style-one'>Add New Product</button>
          </div>
        </div>
        <Fragment>
          <div className='main-container-head mb-3'>
            {/* PRODUCT TABLE */}
            <EnhancedTable
              selected={selected}
              setSelected={setSelected}
              rows={filteredProducts}
              columns={columns}
              count={filteredProducts.length}
              fetching={props.fetching}
              showActions
              actions={[{
                component:
                  <IconButton size='small'><Edit fontSize='small' /></IconButton>,
                onClick: editProduct
              }]}
              showFilters
              filters={[
                {
                  label: 'Name',
                  name: 'name',
                  value: filters.name,
                  type: 'text',
                  id: 'shelfId.rack.name',
                  handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
                },
                {
                  label: 'Quantity',
                  name: 'quantity',
                  value: filters.quantity,
                  type: 'text',
                  id: 'quantityId.name',
                  handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
                },
                {
                  label: 'Price',
                  name: 'price',
                  value: filters.price,
                  type: 'text',
                  id: 'shelfId.name',
                  handleChange: (e) => setFilters(st => ({ ...st, [e.target.name]: e.target.value }))
                }
              ]}
            />
          </div>
        </Fragment>
      </div>

      {/* ---------------ADD PRODUCT MODAL--------------- */}
      <Modal isOpen={isAddProductModal} toggle={toggleAddModal} className='main-modal add-modal'>
        <ModalHeader toggle={toggleAddModal} style={{ zIndex: 100000000000000000000000000000 }}>
          <div className='text-center'>
            <h2>Add New Product</h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Product Name:</label>
                  <TextField
                    id='name'
                    name='name'
                    required
                    value={name}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    style={{ marginTop: '1rem' }}
                    errorMessages={['Name is required']} />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='quantity'>Quantity:</label>
                  <TextField
                    id='quantity'
                    type='Number'
                    name='quantity'
                    required
                    value={quantity}
                    inputProps={{ min: 1 }}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    style={{ marginTop: '1rem' }}
                    errorMessages={['Quantity is required']} />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='price'>Price:</label>
                  <TextField
                    id='price'
                    type='number'
                    name='price'
                    required
                    value={price}
                    inputProps={{ min: 1 }}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Price is required']} />
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='productSize'>Product Size:</label>
                  <Autocomplete
                    value={productSize || ''}
                    getOptionLabel={option => option || ''}
                    inputValue={state.productSize}
                    onChange={(event, newValue) => setState(st => ({ ...st, productSize: newValue || '' }))}
                    onInputChange={(event, newInputValue) => setState(st => ({ ...st, productSize: newInputValue || '' }))}
                    id='productSize'
                    options={[
                      "Small",
                      "Medium",
                      "Large",
                    ]}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='type'>Product Category:</label>
                  <Autocomplete
                    value={type || ''}
                    onChange={(_, newValue) => setState(st => ({ ...st, type: newValue || '' }))}
                    getOptionLabel={option => option || ''}
                    inputValue={state.type}
                    onInputChange={(_, newInputValue) => setState(st => ({ ...st, type: newInputValue || '' }))}
                    id='type'
                    options={['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat']}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />

                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='description'>Description:</label>
                  <TextField
                    id='description'
                    name='description'
                    value={description}
                    required
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Description is required']}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='model'>Model:
                    <div className='img-upload-area'>
                      <div className='text-box'>
                        <h5>Select 3d Model </h5>
                        <div className='input-file'>
                          <input
                            type='file'
                            id='model'
                            name='model'
                            className='form-control'
                            onChange={handleModelChange}
                            required
                          />
                          <span className='btn-edit'>Select File</span>
                        </div>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className='progress'>
                            <div
                              className='progress-bar'
                              role='progressbar'
                              style={{ width: `${uploadProgress}%` }}
                              aria-valuenow={uploadProgress}
                              aria-valuemin='0'
                              aria-valuemax='100'>
                              {uploadProgress}%
                            </div>
                          </div>
                        )}
                        {uploadSuccess && (
                          <div className='success-message'>
                            File uploaded successfully!
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='imageUrl'>Product Picture:
                    <div className='img-upload-area'>
                      <div className='img-box'>
                        {imageUrl ? (
                          <img src={productImage} texPath='' alt='image' />
                        ) : (
                          <img src={require('../../assets/img/place-img.png')} alt='product' />
                        )}
                      </div>
                      <div className='text-box'>
                        <h5>Select Product image </h5>
                        <div className='input-file' style={{ margin: 0 }}>
                          <input
                            type='file'
                            style={{ margin: 0, padding: 0, width: 0, height: 0 }}
                            id='imageUrl'
                            name='imageUrl'
                            className='form-control'
                            onChange={handleImageChange}
                            required
                          />
                          <span className='btn-edit'>Select image</span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div className='col-12'>
                <div className='form-group text-center'>
                  <SubmitButton loading={isSubmitting} />
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      <Dialog
        open={redirectState}
        onClose={handleRedirectClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <DialogContent><DialogContentText>Do you want to place newly added product?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleRedirect} variant='contained' size='small' startIcon={<Check />} color='success'>Yes</Button>
          <Button onClick={handleRedirectClose} variant='contained' size='small' startIcon={<Cancel />} color='error' >Cancel</Button>
        </DialogActions>
      </Dialog>


      {/* ---------------EDIT PRODUCT MODAL--------------- */}
      <Modal isOpen={isEditProductModal} toggle={() => props.toggleEditProductModal(false)} className='main-modal add-modal'>
        <ModalHeader toggle={() => props.toggleEditProductModal(false)}>
          <div className='text-center'>
            <h2>Product ({name}) </h2>
          </div>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleEditSubmit}>
            <div className='row'>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <TextField
                    id='name'
                    name='name'
                    value={name}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    style={{ marginTop: '1rem' }}
                    errorMessages={['Name is required']}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='quantity'>Quantity:</label>
                  <TextField
                    id='quantity'
                    type='number'
                    required
                    name='quantity'
                    value={state.quantity}
                    inputProps={{ min: 1 }}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    style={{ marginTop: '1rem' }}
                    errorMessages={['Quantity is required']}
                  />
                </div>
              </div>

              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='price'>Price:</label>
                  <TextField
                    id='price'
                    name='price'
                    type='number'
                    required
                    value={price}
                    inputProps={{ min: 1 }}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Price is required']}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='description'>Description:</label>
                  <TextField
                    required
                    id='description'
                    name='description'
                    value={description}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Description is required']}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='productSize2'>Product Size:</label>
                  <Autocomplete
                    value={state.productSize || ''}
                    onChange={(event, newValue) => setState(st => ({ ...st, productSize: newValue || '' }))}
                    defaultValue={{ label: "Small", value: 1 }}
                    required
                    getOptionLabel={option => option || ''}
                    inputValue={state.productSize}
                    onInputChange={(event, newInputValue) => {
                      setState(st => ({
                        ...st,
                        productSize: newInputValue || ''
                      }));
                    }}
                    id='productSize2'
                    options={[
                      "Small",
                      "Medium",
                      "Large",
                    ]}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='form-group'>
                  <label htmlFor='type2'>Product Category:</label>
                  <Autocomplete
                    value={state.type || ''}
                    required
                    onChange={(event, newValue) => setState(st => ({ ...st, ['type']: newValue || '' }))}
                    getOptionLabel={option => option || ''}
                    inputValue={state.type}
                    onInputChange={(event, newInputValue) => setState(st => ({ ...st, inputValue: newInputValue || '' }))}
                    id='type2'
                    options={['Snacks', 'Dairy', 'Grocery', 'Dry Fruits', 'Softdrinks', 'Cheese', 'Sweets', 'Meat']}
                    sx={{ width: 300 }}
                    renderInput={params => <TextField {...params} />}
                  />
                </div>
              </div>

              <div className='col-12'>
                <div className='form-group text-center'>
                  <SubmitButton loading={isSubmitting} />
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      {/* ---------------DELETE CONFIRMATION MODAL--------------- */}
      <Modal isOpen={isDeleteProductModal} toggle={() => props.toggleDeleteProductModal(false)} className='main-modal add-modal'>
        <ModalHeader toggle={() => props.toggleDeleteProductModal(false)}></ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleEditSubmit}>
            <div className='text-center'>
              <h2>DELETE PRODUCT</h2>
              <p className='delete-text'>
                Are you sure you want to delete this product?
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
                    onClick={submitDeleteProduct}
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
                    onClick={cancelDeleteProduct}>
                    No
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      <Dialog
        open={warningState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <DialogContent>
          <div className='main-container-head mb-3'>
            <p className='main-container-heading'>These products are on low Quantity</p>
          </div>
          <Fragment>
            <div className='main-container-head mb-3'>
              <EnhancedTable
                selected={selected}
                setSelected={setSelected}
                rows={productQuantity || []}
                columns={columns}
                count={filteredProducts ? filteredProducts.length : 0}
                fetching={props.fetching}
                showActions
                showPagination={false}
                actions={[{
                  component:
                    <IconButton size='small'>
                      <Edit fontSize='small' />
                    </IconButton>,
                  onClick: editProduct
                }]}
              />
            </div>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' size='small' startIcon={<Cancel />} color='error'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = {
  setLoader, addProduct, getAllProducts, deleteProduct, updateProduct, getRackShelves, getProductQuantity,
  getShelfSlot, toggleEditProductModal, togglePlaceProductModal, toggleDeleteProductModal
};

const mapStateToProps = ({ Product, Rack, Shelf, Slot }) => {
  let { shelfSlots } = Slot;
  let { rackShelves } = Shelf;
  let { categoryRacks } = Rack;
  let { allProducts, productQuantity, isEditProductModal, isPlaceProductModal,
    isDeleteProductModal, count, fetching } = Product;
  return {
    allProducts, productQuantity, isEditProductModal, isPlaceProductModal,
    isDeleteProductModal, categoryRacks, rackShelves, shelfSlots, count, fetching
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));
