import React, { useEffect, useState } from "react";
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadProducts } from '../../store/actions/Product'


const ImportDataModal = ({ isOpen, closeModal, uploadProducts }) => {

    // const [open, setOpen] = useState(false)

    const [data, setData] = useState({
        models: [],
        images: [],
        csv: '',
    });

    const [isValidated, setIsValidated] = useState(false)
    const [rows, setRows] = useState(0)

    useEffect(() => {
        if (data.images.length === 0 || data.models.length === 0) return;
        if (rows !== data.images.length || rows !== data.models.length)
            setIsValidated(false)
        else setIsValidated(true)
    }, [data, rows])


    const handleFiles = e => {
        setData(st => ({
            ...st,
            [e.target.name]: e.target.files
        }))
    }

    const handleFile = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const contents = event.target.result;
                const parsedData = Papa.parse(contents, { header: true }).data;
                parsedData.pop();
                setRows(parsedData.length)
            };
            reader.readAsText(file);
        }
        setData(st => ({
            ...st,
            [e.target.name]: e.target.files[0]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        Array(data.images.length).fill().forEach((modelFile, idx) => {
            formData.append('images', data.images[idx]);
        });
        Array(data.models.length).fill().forEach((modelFile, idx) => {
            formData.append('model', data.models[idx]);
        });

        formData.append('data', data.csv)

        uploadProducts({
            formData,
            successCallback: () => {
                closeModal()
                setData({
                    models: [],
                    images: [],
                    csv: '',
                })
            },
            failCallBack: () => { }
        })

    }

    return (
        <Modal isOpen={isOpen} toggle={closeModal} className='main-modal add-modal'>
            <ModalHeader toggle={closeModal} style={{ zIndex: 10000 }}>
                <div className='text-center'>
                    <h2>Import Data</h2>
                </div>
            </ModalHeader>

            <ModalBody className='modal-body'>
                <div className="col-lg-8 offset-lg-2 col-md-12">
                <form onSubmit={(e) => handleSubmit(e)} className='form import-form'>
                    <label className="outlable">Upload Images</label>
                    <Stack marginBottom={2} direction="row" alignItems="center" spacing={2}>
                        <Button size='small' variant="contained" component="label" >
                            <input onChange={handleFiles} name='images' placeholder="Upload Images" accept="image/*" multiple type="file" />
                            <span className="btn-style-one">Upload</span>
                        </Button>
                        {data.images.length > 0 && (
                            <Typography color="textSecondary">
                                {data.images.length} image(s) uploaded
                            </Typography>
                        )}
                    </Stack>

                    {/* <Stack marginBottom={2} direction="row" alignItems="center" spacing={2}> */}
                    <div className="group-form">
                        <label className="outlable">Upload Models</label>
                        <Button size='small' variant="contained" component="label" >
                            <input onChange={handleFiles} name='models' multiple type="file" />
                            <span className="btn-style-one">Upload </span>
                        </Button>
                        {data.models.length > 0 && (
                            <Typography color="textSecondary">
                                {data.models.length} model(s) uploaded
                            </Typography>
                        )}
                    </div>
                    {/* </Stack> */}

                    {/* <Stack marginBottom={2} direction="row" alignItems="center" spacing={2}> */}
                    <div className="group-form">
                        <label className="outlable">Upload CSV file</label>
                        <Button size='small' variant="contained" component="label">
                            <input onChange={handleFile} accept='text/csv' name='csv' multiple type="file" />
                            <span className="btn-style-one">Upload</span>
                        </Button>
                        {data.csv && (
                            <Typography color="textSecondary">
                                1 file uploaded
                            </Typography>
                        )}
                    </div>
                    {/* </Stack> */}
                    <div className="group-form text-center">
                        <button type="submit" className="btn-style-one">
                            Submit
                        </button>
                    </div>
                </form>
                </div>
                
            </ModalBody >
        </Modal>

    )
}


const mapDispatchToProps = { uploadProducts };

const mapStateToProps = ({ Auth }) => {
    let { } = Auth;
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDataModal);
