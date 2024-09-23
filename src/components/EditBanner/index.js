import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Cropper from 'react-cropper';
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'react-datepicker/dist/react-datepicker.css';
import 'cropperjs/dist/cropper.css';

// import './index.css';
import { getCampaign, getCurrentCampaignSlots, getAvailableBannerSlots, getRamadanDates, getEditedBannerMetrics, editBanner } from '../../store/actions/Banner';
import constants from '../utils/constants';
import PaymentDetails from '../../views/Advertiser/PaymentDetails';
import ConfirmAdModal from '../ConfirmAdModal';
import Loader from '../Loader';
import Step3 from './Step3.js';
import Step4 from './Step4.js';

const EditBanner = (props) => {
    const dispatch = useDispatch();
    const campaignId = props?.history?.location?.pathname?.split('/')[3];
    const { campaign, currentCampaignSlots, availableBannerSlots, availableBannerSlotsCount, ramadanDates } = useSelector(st => st.Banners);
    const steps = ['Select slots', 'Campaign settings', 'Targeting', 'Select media', 'Payment details'];
    const minimumDateLimit = new Date(new Date().setDate((new Date()).getDate() + 2));
    const cropper = createRef(null);
    const {
        genders,
        daysOfWeek,
        productCategories,
        bannerTypes,
        slotTypes,
        operatingSystems,
        basicAdAmount,
        citiesUAE
    } = constants;

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [advertisementName, setAdvertisementName] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState([]);
    const [bannerSlotId, setBannerSlotId] = useState([]);
    const [gender, setGender] = useState([]);
    const [fromAge, setFromAge] = useState('');
    const [toAge, setToAge] = useState('');
    const [productCategory, setProductCategory] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [fromHour, setFromHour] = useState('');
    const [toHour, setToHour] = useState('');
    const [location, setLocation] = useState([]);
    const [os, setOs] = useState([]);
    const [device, setDevice] = useState([]);
    const [devices, setDevices] = useState([]);
    const [shareOfVoice, setShareOfVoice] = useState('');
    const [reachNumber, setReachNumber] = useState('');
    const [reachGender, setReachGender] = useState([]);
    const [frequencyCap, setFrequencyCap] = useState('');
    const [lifeEvent, setLifeEvent] = useState('');
    const [timeLimit, setTimeLimit] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [currentType, setCurrentType] = useState('');
    const [rackFile, setRackFile] = useState(null);
    const [tableFile, setTableFile] = useState(null);
    const [roofFile, setRoofFile] = useState(null);
    const [checkoutFile, setCheckoutFile] = useState(null);
    const [fridgeFile, setFridgeFile] = useState(null);
    const [wallFile, setWallFile] = useState(null);
    const [isCropModal, setIsCropModal] = useState(false);
    const [croppedRackFile, setCroppedRackFile] = useState(null);
    const [croppedTableFile, setCroppedTableFile] = useState(null);
    const [croppedRoofFile, setCroppedRoofFile] = useState(null);
    const [croppedCheckoutFile, setCroppedCheckoutFile] = useState(null);
    const [croppedFridgeFile, setCroppedFridgeFile] = useState(null);
    const [croppedWallFile, setCroppedWallFile] = useState(null);
    const [coverRackFile, setCoverRackFile] = useState(null);
    const [coverTableFile, setCoverTableFile] = useState(null);
    const [coverRoofFile, setCoverRoofFile] = useState(null);
    const [coverCheckoutFile, setCoverCheckoutFile] = useState(null);
    const [coverFridgeFile, setCoverFridgeFile] = useState(null);
    const [coverWallFile, setCoverWallFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [uniqueType, setUniqueType] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentBannerId, setPaymentBannerId] = useState(null);
    const [isFetchingBannerMetrics, setIsFetchingBannerMetrics] = useState(false);
    const [amount, setAmount] = useState(null);
    const [refundAmount, setRefundAmount] = useState(null);
    const [impressionsLimit, setImpressionsLimit] = useState(null);
    const [isConfirmModal, setIsConfirmModal] = useState(false);
    const [previousAmount, setPreviousAmount] = useState(null);

    useEffect(() => {
        dispatch(getCampaign(campaignId));
        dispatch(getCurrentCampaignSlots(campaignId));
        dispatch(getRamadanDates());
    }, []);

    useEffect(() => {
        setAmount(((((bannerSlotId.length - 1) * 5) + ((impressionsLimit / 1000) * basicAdAmount)) - previousAmount).toFixed(2));
    }, [bannerSlotId, impressionsLimit, previousAmount]);

    useEffect(() => {
        if (campaign) {
            setCategory(campaign.category || '');
            setAdvertisementName(campaign.adName || '');
            setType(campaign?.banners?.map(banner => banner.type) || []);
            setGender(campaign?.banners[0]?.gender?.split(',') || []);
            setProductCategory(campaign?.banners[0]?.productCategory?.split(',') || []);
            setLocation(campaign?.banners[0]?.location?.split(',') || []);
            setFromAge(campaign?.banners[0]?.fromAge || '');
            setToAge(campaign?.banners[0]?.toAge || '');
            setFromHour(campaign?.banners[0]?.fromHour || '');
            setToHour(campaign?.banners[0]?.toHour || '');
            setSelectedDays(campaign?.banners[0]?.dayOfWeek?.split(',') || []);
            setOs(campaign?.banners[0]?.os?.split(',') || []);
            setDevice(campaign?.banners[0]?.device?.split(',') || []);
            setFrequencyCap(campaign?.banners[0]?.frequencyCap || '');
            setReachNumber(campaign?.banners[0]?.reachNumber || '');
            setReachGender(campaign?.banners[0]?.reachGender?.split(',') || []);
            setShareOfVoice(campaign?.banners[0]?.shareOfVoice || '');
            setLifeEvent(campaign?.banners[0]?.lifeEvent || '');
            setTimeLimit(campaign?.banners[0]?.timeLimit ? (new Date(campaign?.banners[0]?.timeLimit)) : null);

            campaign?.banners?.map(async (banner) => {
                if (banner.type === 'rack') {
                    setCroppedRackFile(banner.bannerUrl);
                    setCoverRackFile(banner.bannerUrl);
                } else if (banner.type === 'table') {
                    setCroppedTableFile(banner.bannerUrl);
                    setCoverTableFile(banner.bannerUrl);
                } else if (banner.type === 'roof') {
                    setCroppedRoofFile(banner.bannerUrl);
                    setCoverRoofFile(banner.bannerUrl);
                } else if (banner.type === 'checkout') {
                    setCroppedCheckoutFile(banner.bannerUrl);
                    setCoverCheckoutFile(banner.bannerUrl);
                } else if (banner.type === 'fridge') {
                    setCroppedFridgeFile(banner.bannerUrl);
                    setCoverFridgeFile(banner.bannerUrl);
                } else if (banner.type === 'wall') {
                    setCroppedWallFile(banner.bannerUrl);
                    setCoverWallFile(banner.bannerUrl);
                }
            });
        }
    }, [campaign]);

    useEffect(() => {
        const uniqueValues = [];

        type.forEach(element => {
            if (!uniqueValues.includes(element)) uniqueValues.push(element);
        });

        setUniqueType(uniqueValues);
    }, [type]);

    useEffect(() => {
        if (uniqueType.length > 0) dispatch(getAvailableBannerSlots({ types: uniqueType.join(',') }));
    }, [uniqueType]);

    useEffect(() => {
        if (os.includes('Android') && os.includes('VR')) setDevices(['Samsung', 'Oppo', 'Xiaomi', 'Vivo', 'One-Plus', 'Oculus']);
        else if (os.includes('Android') && !os.includes('VR')) setDevices(['Samsung', 'Oppo', 'Xiaomi', 'Vivo', 'One-Plus']);
        else if (!os.includes('Android') && os.includes('VR')) setDevices(['Oculus']);
    }, [os]);

    useEffect(() => {
        if (currentCampaignSlots) setBannerSlotId(currentCampaignSlots?.map(slot => slot.id) || []);
    }, [currentCampaignSlots]);

    const toggleCropModal = () => setIsCropModal(!isCropModal);
    const toggleConfirmModal = () => setIsConfirmModal(!isConfirmModal);

    const isStep1Valid = () => {
        if (!advertisementName || advertisementName === '') toast.error('Please enter advertisement name');
        if (!type || type.length === 0) toast.error('Please select slot type');
        if (!bannerSlotId || bannerSlotId.length === 0) toast.error('Please select slots');
        if (!advertisementName || advertisementName === '' || !type || type.length === 0 || !bannerSlotId || bannerSlotId.length === 0) return false;
        return true;
    };

    const isStep2Valid = () => {
        if (category === 'awareness' && lifeEvent === '' && timeLimit === null) {
            toast.error('Please provide life event or ending time');
            return false;
        } else if (category === 'awareness' && lifeEvent === '' && timeLimit && timeLimit < minimumDateLimit) {
            toast.error('Date limit must be 2 or more days from today');
            return false;
        } else return true;
    };

    const isStep4Valid = () => {
        if (!coverRackFile && !coverTableFile && !coverRoofFile && !coverCheckoutFile && !coverFridgeFile && !coverWallFile) {
            toast.error('Please provide media');
            return false;
        } else return true;
    };

    const validateCurrentStep = () => {
        switch (activeStep) {
            case 0:
                return isStep1Valid();
            case 1:
                return isStep2Valid();
            case 3:
                return isStep4Valid();
            default:
                return true;
        }
    };

    const isStepOptional = (step) => { };
    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        const isCurrentStepValid = validateCurrentStep();

        if (isCurrentStepValid) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            if (activeStep === 0 || activeStep === 1 || activeStep === 2) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            } else if (activeStep === 3) handleEditBanner();
            else if (activeStep === 4) props.history.push(`/advertiser/myBanners/${paymentBannerId}`);
        }
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) toast.error("You can't skip a step that isn't optional");

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => setActiveStep(0);

    const resetStates = () => {
        setCategory('');
        setType([]);
        setBannerSlotId([]);
        setBannerFile(null);
        setRackFile(null);
        setTableFile(null);
        setRoofFile(null);
        setCheckoutFile(null);
        setFridgeFile(null);
        setWallFile(null);
        setCroppedRackFile(null);
        setCroppedTableFile(null);
        setCroppedRoofFile(null);
        setCroppedCheckoutFile(null);
        setCroppedFridgeFile(null);
        setCroppedWallFile(null);
        setCoverRackFile(null);
        setCoverTableFile(null);
        setCoverRoofFile(null);
        setCoverCheckoutFile(null);
        setCoverFridgeFile(null);
        setCoverWallFile(null);
        setLocation([]);
        setGender([]);
        setFromAge('');
        setAdvertisementName('');
        setToAge('');
        setProductCategory([]);
        setFromHour('');
        setToHour('');
        setSelectedDays([]);
        setOs([]);
        setDevice([]);
        setFrequencyCap('');
        setShareOfVoice('');
        setReachNumber('');
        setReachGender([]);
        setLifeEvent('');
        setTimeLimit(null);
    };

    const redirectToMyBanners = () => {
        toast.success('Ad edited successfully');
        resetStates();
        setTimeout(() => { props.history.push(`/advertiser/myBanners/${campaignId}`) }, 3000);
    };

    const handleTypeSelect = (typeState) => {
        if (type.includes(typeState)) setType(type.filter(selectedType => selectedType !== typeState));
        else setType([...type, typeState]);
    };

    const handleAllSelect = (selectType) => {
        if (selectType === 'dayOfWeek') {
            if (selectedDays.length === daysOfWeek.length) setSelectedDays([]);
            else setSelectedDays(daysOfWeek)
        } else if (selectType === 'gender') {
            if (gender.length === genders.length) {
                setGender([]);
                setReachGender([]);
            } else {
                setGender(genders.map(slotType => slotType.toLowerCase()));
                setReachGender(genders.map(slotType => slotType.toLowerCase()));
            }
        } else if (selectType === 'location') {
            if (location.length === citiesUAE.length) setLocation([]);
            else setLocation(citiesUAE)
        } else if (selectType === 'productCategory') {
            if (productCategory.length === productCategories.length) setProductCategory([]);
            else setProductCategory(productCategories.map(product => product))
        } else if (selectType === 'slotType') {
            if (type.length == slotTypes.length) setType([]);
            else setType(slotTypes.map(slotType => slotType.toLowerCase()));
        } else if (selectType === 'bannerSlot') {
            // if (bannerSlotId.length === currentCampaignSlots?.length + availableBannerSlots?.length) setBannerSlotId([]);
            if (bannerSlotId.length === availableBannerSlots?.length) setBannerSlotId([]);
            else {
                // let myArray = [...availableBannerSlots, ...currentCampaignSlots];
                // setBannerSlotId(myArray.map(available => available.id));
                setBannerSlotId(availableBannerSlots.map(available => available.id));
            }
        } else if (selectType === 'os') {
            if (os.length === operatingSystems.length) setOs([]);
            else setOs(operatingSystems);
        } else if (selectType === 'device') {
            if (device.length === devices.length) setDevice([]);
            else setDevice(devices);
        }
    };

    const handleProductCategoryChange = (purchaseCategory) => {
        if (productCategory.includes(purchaseCategory)) setProductCategory(productCategory.filter(selectedProduct => selectedProduct !== purchaseCategory));
        else setProductCategory([...productCategory, purchaseCategory]);
    };

    const handleBannerSlotSelect = (slotId) => {
        if (bannerSlotId.includes(slotId)) setBannerSlotId(bannerSlotId.filter(selectedSlotId => selectedSlotId !== slotId));
        else setBannerSlotId([...bannerSlotId, slotId]);
    };

    const handleGenderChange = (genderState) => {
        if (gender.includes(genderState)) {
            setGender(gender.filter(genderElement => genderElement !== genderState));
            if (category === 'awareness') setReachGender(gender.filter(genderElement => genderElement !== genderState));
        } else {
            setGender([...gender, genderState]);
            setReachGender([...gender, genderState]);
        }
    };

    const handleDaySelect = (day) => {
        if (selectedDays.includes(day)) setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        else setSelectedDays([...selectedDays, day]);
    };

    const handleLocationSelect = (selectedLocation) => {
        if (location.includes(selectedLocation)) setLocation(location.filter(locationElement => locationElement !== selectedLocation));
        else setLocation([...location, selectedLocation]);
    };

    const handleLifeEventChange = (lifeEventState) => {
        setLifeEvent(lifeEventState);
        setTimeLimit(null);
    };

    const handleOsSelect = (osState) => {
        if (os.includes(osState)) setOs(os.filter(osElement => osElement !== osState));
        else setOs([...os, osState]);
    };

    const handleDeviceSelect = (deviceState) => {
        if (device.includes(deviceState)) setDevice(device.filter(deviceElement => deviceElement !== deviceState));
        else setDevice([...device, deviceState]);
    };

    const handleSelectMedia = (typeState) => {
        const inputElement = document.getElementById(`${typeState}HiddenImageInput`);
        if (inputElement) inputElement.click();
    };

    const handleCrop = async () => {
        if (cropper.current) {
            let imageToUpload = cropper?.current?.getCroppedCanvas()?.toDataURL();
            currentType === 'rack' && setCroppedRackFile(imageToUpload);
            currentType === 'table' && setCroppedTableFile(imageToUpload);
            currentType === 'roof' && setCroppedRoofFile(imageToUpload);
            currentType === 'checkout' && setCroppedCheckoutFile(imageToUpload);
            currentType === 'fridge' && setCroppedFridgeFile(imageToUpload);

            const timestamp = new Date().getTime();
            const fileName = `banner_${timestamp}.jpg`;

            let res = await fetch(imageToUpload);
            let blob = await res.blob();
            const coverFile = new File([blob], fileName, { type: "image/jpeg" });
            setCoverFile(coverFile);

            currentType === 'rack' && setCoverRackFile(coverFile);
            currentType === 'table' && setCoverTableFile(coverFile);
            currentType === 'roof' && setCoverRoofFile(coverFile);
            currentType === 'checkout' && setCoverCheckoutFile(coverFile);
            currentType === 'fridge' && setCoverFridgeFile(coverFile);
        };

        toggleCropModal();
    };

    const handleMediaChange = (typeState, event) => {
        setCurrentType(typeState);
        setBannerFile(null);

        if (typeState === 'rack') {
            setRackFile(null);
            setCroppedRackFile(null);
            setCoverRackFile(null);
        } else if (typeState === 'table') {
            setTableFile(null);
            setCroppedTableFile(null);
            setCoverTableFile(null);
        } else if (typeState === 'roof') {
            setRoofFile(null);
            setCroppedRoofFile(null);
            setCoverRoofFile(null);
        } else if (typeState === 'checkout') {
            setCheckoutFile(null);
            setCroppedCheckoutFile(null);
            setCoverCheckoutFile(null);
        } else if (typeState === 'fridge') {
            setFridgeFile(null);
            setCroppedFridgeFile(null);
            setCoverFridgeFile(null);
        } else if (typeState === 'wall') {
            setWallFile(null);
            setCroppedWallFile(null);
            setCoverWallFile(null);
        }

        const file = event.target.files[0];
        if (!file) return;

        let allowedFileTypes;
        if (typeState !== 'wall') allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        else allowedFileTypes = ['video/mp4'];
        if (!allowedFileTypes.includes(file.type)) {
            if (typeState !== 'wall') return toast.error(`Only jpg and png files are allowed for this slot type`);
            else return toast.error(`Only mp4 files are allowed for this slot type`);
        }

        let maxSizeInBytes;

        if (file.type.startsWith('image/')) {
            maxSizeInBytes = 0.2 * 1024 * 1024;
            if (file.size > maxSizeInBytes) return toast.error(`File size must be up to 200 KB`);

            let imageSelected = URL.createObjectURL(file);
            let img = document.createElement("img");
            img.src = imageSelected;
            img.onload = () => {
                if (typeState !== 'checkout' && img.width != 2048 && img.height != 128) {
                    toast.info('Dimension of image must be 2048 x 128 for this slot type');
                    typeState === 'rack' && setRackFile(URL.createObjectURL(file));
                    typeState === 'table' && setTableFile(URL.createObjectURL(file));
                    typeState === 'roof' && setRoofFile(URL.createObjectURL(file));
                    typeState === 'fridge' && setFridgeFile(URL.createObjectURL(file));
                    setBannerFile(URL.createObjectURL(file));
                    toggleCropModal();
                } else if (typeState === 'checkout' && img.width != 1024 && img.height != 1024) {
                    toast.info('Dimension of image must be 1024 x 1024 for this slot type');
                    setBannerFile(URL.createObjectURL(file));
                    toggleCropModal();
                } else {
                    if (typeState === 'rack') {
                        setRackFile(URL.createObjectURL(file));
                        setCroppedRackFile(URL.createObjectURL(file));
                        setCoverRackFile(file);
                    } else if (typeState === 'table') {
                        setTableFile(URL.createObjectURL(file));
                        setCroppedTableFile(URL.createObjectURL(file));
                        setCoverTableFile(file);
                    } else if (typeState === 'roof') {
                        setRoofFile(URL.createObjectURL(file));
                        setCroppedRoofFile(URL.createObjectURL(file));
                        setCoverRoofFile(file);
                    } else if (typeState === 'checkout') {
                        setCheckoutFile(URL.createObjectURL(file));
                        setCroppedCheckoutFile(URL.createObjectURL(file));
                        setCoverCheckoutFile(file);
                    } else if (typeState === 'fridge') {
                        setFridgeFile(URL.createObjectURL(file));
                        setCroppedFridgeFile(URL.createObjectURL(file));
                        setCoverFridgeFile(file);
                    }
                }
            };
        } else if (file.type.startsWith('video/')) {
            maxSizeInBytes = 1 * 1024 * 1024;
            if (file.size > maxSizeInBytes) return toast.error(`File size must be up to 1 MB`);

            let videoSelected = URL.createObjectURL(file);
            let video = document.createElement("video");
            video.src = videoSelected;
            video.onloadedmetadata = () => {
                if (video.videoWidth > 1280 || video.videoHeight > 720) toast.info('Dimension of video must be or less than 1280 x 720 for this slot type');
                else {
                    setCroppedWallFile(URL.createObjectURL(file));
                    setCoverWallFile(file);
                }
            };
        }
    };

    const handleEditBanner = () => {
        if (fromAge && toAge && fromAge > toAge) return toast.error('Lower age limit must be less than or equal to upper age limit');
        if (fromAge && toAge && (fromAge < 0 || toAge < 0)) return toast.error('Age must be greater than 0');
        if (fromHour && toHour && fromHour > toHour) return toast.error('Lower time limit must be less than or equal to upper time limit');
        if (timeLimit && timeLimit < minimumDateLimit) return toast.error('Date limit must be 2 or more days from today');

        setIsFetchingBannerMetrics(true);

        dispatch(getEditedBannerMetrics({
            requestData: {
                campaignId,
                advertisementName,
                category,
                type: type.join(','),
                bannerSlotId: bannerSlotId.join(','),
                location: location.join(','),
                gender: gender.join(','),
                fromAge,
                toAge,
                productCategory: productCategory.join(','),
                fromHour,
                toHour,
                dayOfWeek: selectedDays.join(','),
                os: os.join(','),
                device: device.join(','),
                frequencyCap,
                shareOfVoice,
                reachNumber,
                reachGender: reachGender.join(','),
                lifeEvent,
                timeLimit,
            },
            successCallback: (response) => {
                setIsFetchingBannerMetrics(false);
                setPreviousAmount(response.previousAmount);
                setAmount(response.remainingAmount);
                if (response.previousAmount > response.amount) setRefundAmount(response.previousAmount - response.amount);
                setImpressionsLimit(response.impressionsLimit);
                toggleConfirmModal();
            },
            failCallBack: () => setIsFetchingBannerMetrics(false),
        }));
    };

    const handleSubmit = () => {
        if (fromAge && toAge && fromAge > toAge) return toast.error('Lower age limit must be less than or equal to upper age limit');
        if (fromAge && toAge && (fromAge < 0 || toAge < 0)) return toast.error('Age must be greater than 0');
        if (fromHour && toHour && fromHour > toHour) return toast.error('Lower time limit must be less than or equal to upper time limit');
        if (timeLimit && timeLimit < minimumDateLimit) return toast.error('Date limit must be 2 or more days from today');

        setIsSubmitting(true);

        const formData = new FormData();

        formData.append('campaignId', campaignId);
        formData.append('advertisementName', advertisementName);
        formData.append('category', category);
        formData.append('type', type.join(','));
        formData.append('bannerSlotId', bannerSlotId.join(','));
        formData.append('rackFile', coverRackFile);
        formData.append('tableFile', coverTableFile);
        formData.append('roofFile', coverRoofFile);
        formData.append('checkoutFile', coverCheckoutFile);
        formData.append('fridgeFile', coverFridgeFile);
        formData.append('wallFile', coverWallFile);
        formData.append('location', location.join(','));
        formData.append('gender', gender.join(','));
        formData.append('fromAge', fromAge);
        formData.append('toAge', toAge);
        formData.append('productCategory', productCategory.join(','));
        formData.append('fromHour', fromHour);
        formData.append('toHour', toHour);
        formData.append('dayOfWeek', selectedDays.join(','));
        formData.append('os', os.join(','));
        formData.append('device', device.join(','));
        formData.append('frequencyCap', frequencyCap);
        formData.append('shareOfVoice', shareOfVoice);
        formData.append('reachNumber', reachNumber);
        formData.append('reachGender', reachGender.join(','));
        formData.append('lifeEvent', lifeEvent);
        formData.append('timeLimit', timeLimit);
        formData.append('impressionsLimit', impressionsLimit);
        formData.append('amount', amount);

        dispatch(editBanner({
            formData: formData,
            successCallback: (editedBanner) => {
                setPaymentBannerId(editedBanner.id);
                toggleConfirmModal();
                setIsSubmitting(false)

                if (Number(amount) === 0) props.history.push(`/advertiser/myBanners/${editedBanner.id}`);
                else setActiveStep(4);
            },
            failCallBack: () => setIsSubmitting(false),
        }));
    };

    return (
        <div className='content create-banner-page'>
            <div className='top-heading-area home-header'>
                <div className="page-title">
                    <ArrowBackIcon className="back-arrow" onClick={() => props.history.push(`/advertiser/myBanners`)} />
                    <h3 className="ml-2">Edit Campaign</h3>
                </div>
            </div>
            {
                campaign ? (
                    <>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} className='create-banner-step'>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                        labelProps.optional = (
                                            <Typography variant="caption">Optional</Typography>
                                        );
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className='row'>
                                        <div className={activeStep <= 2 ? 'col-xl-8 offset-xl-2 col-lg-12' : 'col-lg-12'}>
                                            <Typography className='heading-step' sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                        </div>
                                    </div>

                                    {/* {activeStep === 0 && (
                                        <div className='row'>
                                            <div className='col-12'>
                                                <div className='form-group'>
                                                    <label htmlFor='category'>Category: *</label>
                                                    {bannerTypes && bannerTypes.map((bannerType, index) => (
                                                        <label key={index}>
                                                            <input
                                                                id={bannerType}
                                                                name={bannerType}
                                                                type='radio'
                                                                checked={bannerType.toLowerCase() === category}
                                                                value={bannerType.toLowerCase()}
                                                                onChange={(event) => handleCategoryChange(event.target.value)}
                                                            />
                                                            {bannerType}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )} */}

                                    {activeStep === 0 && (
                                        <div className='row'>
                                            <div className='col-xl-8 offset-xl-2 col-lg-12'>
                                                <div className='form-group'>
                                                    <label>Campaign Name: *</label>
                                                    <input
                                                        id='advertisementName'
                                                        name='advertisementName'
                                                        type='text'
                                                        required
                                                        value={advertisementName}
                                                        placeholder='Enter your Advertisement Name'
                                                        onChange={(event) => setAdvertisementName(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-xl-8 offset-xl-2 col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor='slotType'>Slot Type: *</label>
                                                    <Select
                                                        id='slotType'
                                                        required
                                                        multiple
                                                        value={type}
                                                        // onChange={(event) => setType(event.target.value)}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="" onClick={() => handleAllSelect('slotType')}>
                                                            {/* <FormControlLabel control={<Checkbox checked={type.length === slotTypes.length} />} label={'All'} /> */}
                                                            <div onClick={() => handleAllSelect('slotType')}>
                                                                <Checkbox checked={type.length === slotTypes.length} />
                                                                {'All'}
                                                            </div>
                                                        </MenuItem>
                                                        {slotTypes && slotTypes.map((slotType, index) => (
                                                            <MenuItem key={index} value={slotType.toLowerCase()} onClick={() => handleTypeSelect(slotType.toLowerCase())}>
                                                                {/* <FormControlLabel control={<Checkbox checked={type.includes(slotType.toLowerCase())} />} label={slotType} /> */}
                                                                <div onClick={() => handleTypeSelect(slotType.toLowerCase())}>
                                                                    <Checkbox checked={type.includes(slotType.toLowerCase())} />
                                                                    {slotType !== 'Wall' ? `${slotType} (Display)` : `${slotType} (Video)`}
                                                                </div>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className='col-xl-8 offset-xl-2 col-lg-12'>
                                                <div className='form-group'>
                                                    <label htmlFor='slot'>Slot: *</label>
                                                    <Select
                                                        id='slot'
                                                        required
                                                        multiple
                                                        value={bannerSlotId}
                                                        disabled={!availableBannerSlots || availableBannerSlotsCount == 0}
                                                        // onChange={(event) => setBannerSlotId(event.target.value)}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="" onClick={() => handleAllSelect('bannerSlot')}>
                                                            <div onClick={() => handleAllSelect('bannerSlot')}>
                                                                <Checkbox checked={bannerSlotId.length === currentCampaignSlots?.length + availableBannerSlots?.length} />
                                                                {'All'}
                                                            </div>
                                                        </MenuItem>
                                                        {/* {currentCampaignSlots && currentCampaignSlots.map((bannerSlot) => (
                                                            <MenuItem key={bannerSlot.id} value={bannerSlot.id} onClick={() => handleBannerSlotSelect(bannerSlot.id)}>
                                                                <div onClick={() => handleBannerSlotSelect(bannerSlot.id)}>
                                                                    <Checkbox checked={bannerSlotId.includes(bannerSlot.id)} />
                                                                    {bannerSlot.name}
                                                                </div>
                                                            </MenuItem>
                                                        ))} */}
                                                        {(availableBannerSlots && availableBannerSlotsCount > 0) && (
                                                            availableBannerSlots.map((bannerSlot) => (
                                                                <MenuItem key={bannerSlot.id} value={bannerSlot.id} onClick={() => handleBannerSlotSelect(bannerSlot.id)}>
                                                                    <div onClick={() => handleBannerSlotSelect(bannerSlot.id)}>
                                                                        <Checkbox checked={bannerSlotId.includes(bannerSlot.id)} />
                                                                        {bannerSlot.name}
                                                                    </div>
                                                                </MenuItem>
                                                            ))
                                                        )}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className='col-lg-8 offset-lg-2 col-md-12'>
                                                <div className='form-group'>
                                                    <div className='img-upload-area'>
                                                        <div className='text-box style-two'>
                                                            <label className='lablel-slot'>Slots Preview: *</label>
                                                            <div className='row'>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-4'>
                                                                    <label>Rack</label>
                                                                    <div className={`input-file rack`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='replace-img' src={require(`../../assets/bannerSlots/rack.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-4'>
                                                                    <label>Table</label>
                                                                    <div className={`input-file table`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='replace-img' src={require(`../../assets/bannerSlots/table.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-4'>
                                                                    <label>Roof</label>
                                                                    <div className={`input-file roof`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='replace-img' src={require(`../../assets/bannerSlots/roof.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                                                                    <label>Checkout</label>
                                                                    <div className={`input-file checkout`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='replace-img' src={require(`../../assets/bannerSlots/checkout.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                                                                    <label>Fridge</label>
                                                                    <div className={`input-file fridge`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='replace-img' src={require(`../../assets/bannerSlots/fridge.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-4 col-md-6 col-sm-12 mt-5'>
                                                                    <label>Wall</label>
                                                                    <div className={`input-file wall`}>
                                                                        <div className='img-box'>
                                                                            <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                            <img className='place-img' src={require(`../../assets/bannerSlots/wall.png`)} alt='file' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 1 && (
                                        <div className='row'>
                                            <div className='col-xl-8 offset-xl-2 col-lg-12'>
                                                <Step3
                                                    category={category}
                                                    location={location}
                                                    setLocation={setLocation}
                                                    handleLocationSelect={handleLocationSelect}
                                                    fromHour={fromHour}
                                                    setFromHour={setFromHour}
                                                    toHour={toHour}
                                                    setToHour={setToHour}
                                                    os={os}
                                                    setOs={setOs}
                                                    handleOsSelect={handleOsSelect}
                                                    device={device}
                                                    setDevice={setDevice}
                                                    devices={devices}
                                                    handleDeviceSelect={handleDeviceSelect}
                                                    timeLimit={timeLimit}
                                                    setTimeLimit={setTimeLimit}
                                                    lifeEvent={lifeEvent}
                                                    setLifeEvent={setLifeEvent}
                                                    handleLifeEventChange={handleLifeEventChange}
                                                    ramadanDates={ramadanDates}
                                                    handleAllSelect={handleAllSelect}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 2 && (
                                        <div className='row'>
                                            <div className='col-xl-8 offset-xl-2 col-lg-12'>
                                                <Step4
                                                    productCategory={productCategory}
                                                    handleProductCategoryChange={handleProductCategoryChange}
                                                    gender={gender}
                                                    handleGenderChange={handleGenderChange}
                                                    fromAge={fromAge}
                                                    setFromAge={setFromAge}
                                                    toAge={toAge}
                                                    setToAge={setToAge}
                                                    selectedDays={selectedDays}
                                                    reachNumber={reachNumber}
                                                    setReachNumber={setReachNumber}
                                                    frequencyCap={frequencyCap}
                                                    setFrequencyCap={setFrequencyCap}
                                                    shareOfVoice={shareOfVoice}
                                                    setShareOfVoice={setShareOfVoice}
                                                    handleDaySelect={handleDaySelect}
                                                    handleAllSelect={handleAllSelect}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 3 && (
                                        <div className='row'>
                                            <div className='col-12'>
                                                <label htmlFor='fileUrl'>Ad Preview:
                                                    {uniqueType && uniqueType.map((typeState, index) => (
                                                        <div key={index} className='form-group'>
                                                            <div className='img-upload-area'>
                                                                <div className='text-box'>
                                                                    <div className="row">
                                                                        <div className='col-lg-4 col-md-12'>
                                                                            <div className='btn-groups'>
                                                                                <div className='img-upload-box'>
                                                                                    <span
                                                                                        className='btn-edit'
                                                                                        onClick={() => handleSelectMedia(typeState)}
                                                                                    >
                                                                                        {typeState !== 'wall' ? 'Select image' : 'Select video'}
                                                                                    </span>
                                                                                    <input
                                                                                        type='file'
                                                                                        id={`${typeState}HiddenImageInput`}
                                                                                        name='fileUrl'
                                                                                        className='form-control image-selector'
                                                                                        accept="image/*,video/*"
                                                                                        onChange={(event) => handleMediaChange(typeState, event)}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <span
                                                                                    className='btn-submit'
                                                                                    onClick={() => {
                                                                                        setCurrentType(typeState);
                                                                                        typeState === 'rack' && setBannerFile(rackFile);
                                                                                        typeState === 'table' && setBannerFile(tableFile);
                                                                                        typeState === 'roof' && setBannerFile(roofFile);
                                                                                        typeState === 'checkout' && setBannerFile(checkoutFile);
                                                                                        typeState === 'fridge' && setBannerFile(fridgeFile);
                                                                                        toggleCropModal();
                                                                                    }}
                                                                                >
                                                                                    Crop Image
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-lg-8 col-md-12'>
                                                                            <label>{typeState} File: *</label>
                                                                            {(typeState === 'rack' && croppedRackFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={croppedRackFile} texPath='' alt='image' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (typeState === 'table' && croppedTableFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={croppedTableFile} texPath='' alt='image' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (typeState === 'roof' && croppedRoofFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={croppedRoofFile} texPath='' alt='image' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (typeState === 'checkout' && croppedCheckoutFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={croppedCheckoutFile} texPath='' alt='image' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (typeState === 'fridge' && croppedFridgeFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={croppedFridgeFile} texPath='' alt='image' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (typeState === 'wall' && croppedWallFile) ? (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <video className='preview-video' loop autoPlay muted controls>
                                                                                            <source src={croppedWallFile} type="video/mp4" />
                                                                                        </video>
                                                                                        <img className='place-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                <div className={`input-file ${typeState}`} style={{ margin: 0 }}>
                                                                                    <div className='img-box'>
                                                                                        <img className='place-img' src={require('../../assets/img/place-img.png')} alt='file' />
                                                                                        <img className='replace-img' src={require(`../../assets/bannerSlots/${typeState}.png`)} alt='file' />
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <p className='img-size'>
                                                                                {
                                                                                    (typeState !== 'checkout' && typeState !== 'wall')
                                                                                        ? <span>Image dimensions: 2048 x 720 <br /><span>Max size: 200kb</span></span>
                                                                                        : typeState === 'checkout'
                                                                                            ? <span>Image dimensions: 1024 x 1024 <br /><span>Max size: 200kb</span></span>
                                                                                            : <span>Video size: 1280 x 720 <br /><span>Max size: 500kb</span></span>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>



                                                                    {/* ------------------CROP MODAL----------------- */}
                                                                    <Modal isOpen={isCropModal} className="main-modal add-modal crop-modal">
                                                                        <ModalBody className="modal-body">
                                                                            <h2>Crop Image</h2>
                                                                            <Cropper
                                                                                ref={cropper}
                                                                                guides={false}
                                                                                aspectRatio={(currentType !== 'checkout' && currentType !== 'wall') ? 16 : 1}
                                                                                className='cropper-settings'
                                                                                src={bannerFile}
                                                                            />
                                                                        </ModalBody>
                                                                        <ModalFooter className="modal-footer">
                                                                            <button className="modal-btn" onClick={handleCrop}>Crop</button>
                                                                        </ModalFooter>
                                                                    </Modal>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 4 && <PaymentDetails amount={amount} isRedirect={true} history={props.history} paymentBannerId={paymentBannerId} />}

                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        {activeStep !== 0 && activeStep !== 4 &&
                                            <Button
                                                color="inherit"
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                                className='btn-style-one'
                                                disabled={activeStep === 0 || activeStep === 4}
                                            >
                                                Back
                                            </Button>
                                        }
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                            <Button className='btn-style-one' color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}

                                        <Button className='btn-style-one' onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>

                        <ConfirmAdModal
                            isConfirmModal={isConfirmModal}
                            toggleConfirmModal={toggleConfirmModal}
                            amount={amount}
                            impressions={impressionsLimit}
                            setImpressions={setImpressionsLimit}
                            handleSubmit={handleSubmit}
                            isLoading={isSubmitting}
                        />
                    </>
                ) : <Loader />
            }
        </div>
    );
};

export default EditBanner;