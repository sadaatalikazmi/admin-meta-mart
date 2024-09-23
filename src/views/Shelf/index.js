import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import React, { Fragment, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { getAllShelves, updateShelf, deleteShelf } from '../../store/actions/Shelf';

import './index.css';
import EnhancedTable from '../../components/table';
import { addShelf } from '../../store/actions/Shelf';
import parseQueryStrring from '../../helpers/parse-query-strring';

const Shelf = (props) => {
  
  // STATE
  const [state, setState] = useState({
    formData: {
      name: '',
      rack: '',
      maxSlots: '',
      selectedShelf: null,
      isDeleteShelfModal: false
    }
  });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [filteredSelves, setFilteredSelves] = useState([]);
  const [filters, setFilters] = useState({ name: '', shelf: '', slots: '' });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search).get('page');
    if (!query) return;
    if (query) setPage(+query);
  }, [props.location.search]);

  useEffect(() => {
    let obj = {};
    const searchParams = parseQueryStrring(props.location.search);
    Object.entries(searchParams).forEach(([key, value]) => obj[key] = value);
    props.getAllShelves();
  }, [page]);

  useEffect(() => {
    setFilteredSelves(props.allShelves || []);
  }, [props.allShelves]);

  useEffect(() => {
    if (!props.allShelves) return;
    setFilteredSelves(props.allShelves.filter(el => {
      let condition = true;
      if (filters.name) condition = condition && el.rack && el.rack.name.toLowerCase().includes(filters.name.toLowerCase())
      if (filters.shelf) condition = condition && el.name.toLowerCase().includes(filters.shelf.toLowerCase())
      if (filters.slots) condition = condition && +el.maxSlots === +filters.slots

      return condition;
    }));
  }, [filters]);

  // SUBMIT UPDATE SHELF
  const handleUpdateShelf = async () => {
    const { formData, selectedShelf } = state;
    if (selectedShelf === '' || selectedShelf === null || selectedShelf === undefined) props.addShelf(formData);
    else props.updateShelf(formData);
    setState({ selectedShelf: null });
    setState({ isShelfModal: false }); // Close the modal
  };

  // SUBMIT DELETE SHELF
  const submitDeleteShelf = () => {
    const { selectedShelf } = state;
    props.deleteShelf(selectedShelf);
    setState({ isDeleteShelfModal: false });
  };

  // CANCEL DELETE SHELF
  const cancelDeleteShelf = () => setState({ isDeleteShelfModal: false });

  // EIDT INPUT FIELD
  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  // TOGGLE SHELF MODAL
  const toggleShelfModal = () =>
    setState(prevState => ({
      isShelfModal: !prevState.isShelfModal,
      selectedShelf: null,
      formData: {
        name: '',
        rack: '',
        maxSlots: '',
        isDeleteShelfModal: false
      }
    }));

  const { name, rack, maxSlots } = formData;
  const { formData, isShelfModal, isDeleteShelfModal } = state;

  const columns = [
    {
      label: 'Rack Name',
      accessor: 'rack.name',
      id: 'rack.name',
      key: 'rackName'
    },
    {
      label: 'Shelf Name',
      accessor: 'name',
      id: 'name',
      key: 'shelfName'
    },
    {
      label: 'Max Slots',
      accessor: 'maxSlots',
      id: 'maxSlots',
      key: 'maxSlots'
    }
  ];

  return (
    <div className='content'>
      <div className='main-container mintedNFT'>
        <div className='main-container-head mb-3'>
          <p className='main-container-heading'>All Shelves</p>
        </div>
        <Fragment>
          <div className='main-container-head mb-3'>
            {/* SHELF TABLE */}
            <EnhancedTable
              rows={filteredSelves}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
              count={filteredSelves.length}
              fetching={props.fetching}
              showPagination={false}
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
                  label: 'Shelf',
                  name: 'shelf',
                  value: filters.shelf,
                  type: 'text',
                  id: 'shelfId.name',
                  handleChange: (e) => {
                    setFilters(st => ({
                      ...st, [e.target.name]: e.target.value
                    }))
                  }
                },
                {
                  label: 'Slots',
                  name: 'slots',
                  value: filters.slots,
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
          </div>
        </Fragment>
      </div>

      {/* ---------------UPDATE SHELF MODAL--------------- */}
      <Modal
        isOpen={isShelfModal}
        toggle={toggleShelfModal}
        className='main-modal Shelf-modal'
      >
        <ModalHeader toggle={toggleShelfModal}>
        </ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form' onSubmit={handleUpdateShelf}>
            <div className='row'>
              <div className='col-lg-10 offset-lg-1 col-md-12'>
                <div className='form-group'>
                  <label htmlFor='rackId'>Rack Id</label>
                  <SelectValidator
                    id='rackId'
                    name='rack'
                    value={rack}
                    className='form-control'
                    placeholder='Select Category'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Rack Id is required']}
                  >
                    <option value=''>Select Rack</option>
                    <option value='648bfb557068a459a5b3afc1'>Rack 1</option>
                  </SelectValidator>
                </div>

                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <TextValidator
                    type='text'
                    id='name'
                    name='name'
                    value={name}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Shelf axis-X is required']}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='maxSlots'>Max Slot</label>
                  <TextValidator
                    type='double'
                    id='maxSlots'
                    name='maxSlots'
                    value={maxSlots}
                    className='form-control'
                    onChange={handleChange}
                    validators={['required']}
                    errorMessages={['Shelf axis-Y is required']}
                  />
                </div>
                <div className='form-group text-center'>
                  <Button type='submit' className='submit-btn mt-4'>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>

      {/* ---------------DELETE SHELF MODAL--------------- */}
      <Modal
        isOpen={isDeleteShelfModal}
        toggle={() => props.toggleDeleteShelfModal(false)}
        className='main-modal add-modal'
      >
        <ModalHeader
          toggle={() => setState({ isDeleteShelfModal: false })}
        ></ModalHeader>
        <ModalBody className='modal-body'>
          <ValidatorForm className='form'>
            <div className='text-center'>
              <h2>DELETE SHELF</h2>
              <p className='delete-text'>
                Are you sure you want to delete this shelf?
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
                    onClick={submitDeleteShelf}
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
                    onClick={cancelDeleteShelf}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </ValidatorForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = {
  addShelf,
  getAllShelves,
  updateShelf,
  deleteShelf
};

const mapStateToProps = ({ Shelf }) => {
  let { allShelves, count, fetching } = Shelf;
  return { allShelves, count, fetching };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shelf);
