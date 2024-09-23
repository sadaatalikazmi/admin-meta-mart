import { connect } from 'react-redux';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PhoneInput from 'react-phone-input-2';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import React, { useEffect, useState } from 'react';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Dropdown from 'react-bootstrap/Dropdown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { getVendor, updateVender, cancelAccount, saveDataProtectionContact, getDataProtectionContact, saveTradeLicense } from '../../../store/actions/User';
import getTimeZone from '../../../components/utils/getTimeZone';


const Accordion = styled((props) => (

  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const AccountSetting = (props) => {
  const dispatch = useDispatch();
  const { vendor, dataProtectionContact } = useSelector(st => st.User);

  const [expanded, setExpanded] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [primaryContact, setPrimaryContact] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [dataProtectionOfficer, setDataProtectionOfficer] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [tradeLicenseFileText, setTradeLicenseFileText] = useState('');

  useEffect(() => {
    dispatch(getVendor());
    dispatch(getDataProtectionContact());
    setTimeZone(getTimeZone());
  }, []);

  useEffect(() => {
    if (vendor) setVendorName(vendor);
  }, [vendor]);

  useEffect(() => {
    if (dataProtectionContact) {
      setPrimaryContact({
        name: dataProtectionContact?.pcName || '',
        email: dataProtectionContact?.pcEmail || '',
        phoneNumber: dataProtectionContact?.pcPhoneNumber || '',
        address: dataProtectionContact?.pcAddress || '',
      });

      setDataProtectionOfficer({
        name: dataProtectionContact?.dpcName || '',
        email: dataProtectionContact?.dpcEmail || '',
        phoneNumber: dataProtectionContact?.dpcPhoneNumber || '',
        address: dataProtectionContact?.dpcAddress || '',
      });

      setTradeLicenseFileText(dataProtectionContact?.tradeLicense || '');
    }
  }, [dataProtectionContact]);

  const handlePrimaryContactChange = (field, value) => {
    setPrimaryContact(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleDataProtectionOfficerChange = (field, value) => {
    setDataProtectionOfficer(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleChange = (panel) => (event, expanded) => setExpanded(expanded ? panel : false);
  const handleSaveVender = () => dispatch(updateVender({ vendor: vendorName }));
  const handleCancelAccount = () => dispatch(cancelAccount());

  const handleSaveDataProtectionContact = () => {
    const requestData = {
      pcName: primaryContact.name,
      pcEmail: primaryContact.email,
      pcPhoneNumber: primaryContact.phoneNumber,
      pcAddress: primaryContact.address,
      dpcName: dataProtectionOfficer.name,
      dpcEmail: dataProtectionOfficer.email,
      dpcPhoneNumber: dataProtectionOfficer.phoneNumber,
      dpcAddress: dataProtectionOfficer.address
    };

    dispatch(saveDataProtectionContact(requestData));
  };

  const handleSaveTradeLicenseFile = async () => {
    const formData = new FormData();

    formData.append('tradeLicenseFile', tradeLicenseFile);

    dispatch(saveTradeLicense({
      formData: formData,
      successCallback: (tradeLicense) => setTradeLicenseFileText(tradeLicense),
      failCallBack: () => { },
    }));
  };

  return (
    <div className='content create-banner-page  '>

      <div className='row'>
        <div className='col-xl-8 offset-xl-2 col-lg-12'>
          <div className='top-heading-area home-header'>
            <h3>Account settings</h3>
          </div>
          <Accordion expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}>
            <AccordionSummary aria-controls={`panel1`} id={`panel1`}>
              <Typography>Account name</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <input
                      id='accountName'
                      name='accountName'
                      type='text'
                      required
                      value={vendorName}
                      placeholder='Account Name'
                      onChange={(event) => setVendorName(event.target.value)}
                    />
                  </div>
                  <div className='right-area'>
                    <p>This is the name associated with your advertiser account.</p>
                  </div>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-two" onClick={() => setExpanded('')}>Cancel</button>
                  <button className="btn-style-one" onClick={handleSaveVender}>Save</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel2`} onChange={handleChange(`panel2`)}>
            <AccordionSummary aria-controls={`panel2`} id={`panel2`}>
              <Typography>Account status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <p>Your account is active.</p>
                  </div>
                  <div className='right-area'>
                    <p>To stop running ads, edit your campaigns. <br /><br />If you cancel your account, your ads will stop running and your account will be suspended.</p>
                  </div>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-one" onClick={handleCancelAccount}>Cancel my account</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel3`} onChange={handleChange(`panel3`)}>
            <AccordionSummary aria-controls={`panel3`} id={`panel3`}>
              <Typography>Data protection contacts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <label className='label-off'>Primary contact</label>
                    <input
                      id='Name'
                      name='Name'
                      type='text'
                      required
                      value={primaryContact.name}
                      placeholder='Name (required)'
                      onChange={(event) => handlePrimaryContactChange('name', event.target.value)}
                    />
                    <input
                      id='Email'
                      name='Email'
                      type='email'
                      required
                      value={primaryContact.email}
                      placeholder='Email (required)'
                      onChange={(event) => handlePrimaryContactChange('email', event.target.value)}
                    />
                    <input
                      id='PhoneNumber'
                      name='PhoneNumber'
                      type='phoneNumber'
                      required
                      value={primaryContact.phoneNumber}
                      onChange={(event) => handlePrimaryContactChange('phoneNumber', event.target.value)}
                      placeholder='Phone Number'
                    />
                    <input
                      id='Address'
                      name='Address'
                      type='text'
                      required
                      value={primaryContact.address}
                      placeholder='Address'
                      onChange={(event) => handlePrimaryContactChange('address', event.target.value)}
                    />
                    <label className='label-off'>Data protection officer</label>
                    <input
                      id='Name'
                      name='Name'
                      type='text'
                      required
                      value={dataProtectionOfficer.name}
                      placeholder='Name'
                      onChange={(event) => handleDataProtectionOfficerChange('name', event.target.value)}
                    />
                    <input
                      id='Email'
                      name='Email'
                      type='email'
                      required
                      value={dataProtectionOfficer.email}
                      onChange={(event) => handleDataProtectionOfficerChange('email', event.target.value)}
                      placeholder='Email'
                    />
                    <input
                      id='PhoneNumber'
                      name='PhoneNumber'
                      type='phoneNumber'
                      required
                      value={dataProtectionOfficer.phoneNumber}
                      onChange={(event) => handleDataProtectionOfficerChange('phoneNumber', event.target.value)}
                      placeholder='Phone Number'
                    />
                    <input
                      id='Address'
                      name='Address'
                      type='text'
                      required
                      value={dataProtectionOfficer.address}
                      placeholder='Address'
                      onChange={(event) => handleDataProtectionOfficerChange('address', event.target.value)}
                    />
                  </div>
                  <div className='right-area'>
                    <p>MetaMart will send notices about the MetaMart Ads Data Processing Terms to your primary contact. <br /><br />If your organization has a data protection officer add their contact information.</p>
                  </div>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-two" onClick={() => setExpanded('')}>Cancel</button>
                  <button className="btn-style-one" onClick={handleSaveDataProtectionContact}>Save</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* <Accordion expanded={expanded === `panel4`} onChange={handleChange(`panel4`)}>
            <AccordionSummary aria-controls={`panel4`} id={`panel4`}>
              <Typography>Third-party measurement</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <p>Add vendors to be used in campaign settings. To have the same vendor automatically added to all new campaigns, contact Google support.</p>
                  </div>
                  <div className='right-area'>
                    <button className="btn-style-one">Add vendor</button>
                  </div>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-two">Cancel</button>
                  <button className="btn-style-one">Save</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion> */}

          <Accordion expanded={expanded === `panel5`} onChange={handleChange(`panel5`)}>
            <AccordionSummary aria-controls={`panel5`} id={`panel5`}>
              <Typography>Time zone</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <p>{timeZone}</p>
                  </div>
                  <div className='right-area'>
                    <p>To manage your account in a different time zone, you must be located in that time zone.</p>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel6`} onChange={handleChange(`panel6`)}>
            <AccordionSummary aria-controls={`panel6`} id={`panel6`}>
              <Typography>Trade license</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <input
                      id='tradeLicense'
                      name='tradeLicense'
                      type='file'
                      onChange={(event) => setTradeLicenseFile(event.target.files[0])}
                    />
                    {tradeLicenseFileText && tradeLicenseFileText !== '' && <a href={tradeLicenseFileText} target='blank'>Trade License</a>}
                  </div>
                  <div className='right-area'>
                    <p>Upload your trade license.</p>
                  </div>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-two" onClick={() => setExpanded('')}>Cancel</button>
                  <button className="btn-style-one" onClick={() => handleSaveTradeLicenseFile()}>Save</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel7`} onChange={handleChange(`panel7`)}>
            <AccordionSummary aria-controls={`panel7`} id={`panel7`}>
              <Typography>VAT</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <p>VAT: 5%</p>
                  </div>
                  <div className='right-area'>
                    <p>This percentage of VAT is being deducted per order from users.</p>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          
          {/* <Accordion expanded={expanded === `panel7`} onChange={handleChange(`panel7`)}>
            <AccordionSummary aria-controls={`panel7`} id={`panel7`}>
              <Typography>Tracking</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <input
                      id='accountName'
                      name='accountName'
                      type='text'
                      required
                      placeholder='Tracking template'
                    />
                    <label>Example: https://www.trackingtemplate.foo/?url=lpurl&id=5</label>
                    <input
                      id='accountName'
                      name='accountName'
                      type='text'
                      required
                      placeholder='Final URL suffix'
                    />
                    <label>Example: param1=value1&param2=value2</label>
                    <button className="btn-style-two">Test</button>
                  </div>
                  <div className='right-area'>
                    <p>This is the name that everyone who has access to this account will see.</p>
                  </div>
                </div>
                <div className='bottom-footer style-two'>
                  <label>
                    <Switch />
                    Parallel tracking
                  </label>
                  <p>For Hotel campaigns</p>
                </div>
                <div className='bottom-footer'>
                  <button className="btn-style-two">Cancel</button>
                  <button className="btn-style-one">Save</button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel8`} onChange={handleChange(`panel8`)}>
            <AccordionSummary aria-controls={`panel8`} id={`panel8`}>
              <Typography>Call reporting</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <p>Get detailed information about calls you've received</p>
                    <div className='radiobox'>
                      <label>
                        <Radio />
                        On
                      </label>
                      <label>
                        <Radio />
                        Off
                      </label>
                    </div>
                    <p>Save call recordings for 30 days</p>
                    <label>Listen to call recordings from your call details report. Make sure your ad or ad extension has a US-based phone number and a verified URL. Learn more</label>
                    <div className='radiobox'>
                      <label>
                        <Radio />
                        On
                      </label>
                      <label>
                        <Radio />
                        Off
                      </label>
                    </div>
                    <p>Send Google Ads call data to a call analytics provider</p>
                    <label>Support your call third-party analytics with performance-related data from ads that use your dynamic tracking number.</label>
                    <div className='radiobox'>
                      <label>
                        <Radio />
                        On
                      </label>
                      <label>
                        <Radio />
                        Off
                      </label>
                    </div>
                    <label htmlFor='analytics'>Call analytics provider</label>
                    <Select
                      id='analytics'
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="all"><em>Select a provider</em></MenuItem>
                      <MenuItem value="all">Select a provider</MenuItem>
                      <MenuItem value="all">Select a provider</MenuItem>
                      <MenuItem value="all">Select a provider</MenuItem>
                      <MenuItem value="all">Select a provider</MenuItem>
                    </Select>
                  </div>
                  <div className='bottom-footer'>
                    <button className="btn-style-two">Cancel</button>
                    <button className="btn-style-one">Save</button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel9`} onChange={handleChange(`panel9`)}>
            <AccordionSummary aria-controls={`panel9`} id={`panel9`}>
              <Typography>Negative keywords</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group style-two'>
                    <p>Search, Shopping, and Performance Max Campaigns</p>
                    <p>Account-level negative keyword prevent your ads from showing to people who search for or browse content related to those words. Define up to 1,000 negative keywords to apply to all eligible campaigns. Learn more</p>
                  </div>
                  <div className='bottom-footer style-two'>
                    <div className='table-deta'>
                      <button className='plus-btn'>+</button>
                      <Dropdown>
                        <Dropdown.Toggle variant='success' id='dropdown-basic'>
                          <i className='icon'><FilterAltIcon /></i>Add Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                        >
                          <Dropdown.Item>
                            Keyword text
                          </Dropdown.Item>
                          <Dropdown.Item>
                            Match type
                          </Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>
                      <button className='download-btn'><i className='icon'><DownloadIcon /></i> Download</button>
                    </div>
                  </div>
                  <div className='bottom-footer'>
                    <button className="btn-style-two">Cancel</button>
                    <button className="btn-style-one">Save</button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel10`} onChange={handleChange(`panel10`)}>
            <AccordionSummary aria-controls={`panel10`} id={`panel10`}>
              <Typography>Auto-apply</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group'>
                    <label>Auto-apply is turned off</label>
                    <p>You can turn on auto-apply for 22 recommendation types:</p>
                    <div className='auto-apply'>
                      <p>Bid more efficiently with Target impression share</p>
                      <p>Bid more efficiently with Maximize clicks</p>
                      <p>Bid more efficiently with Maximize conversions</p>
                      <p>Bid more efficiently with Maximize conversion value</p>
                      <p>Bid more efficiently with Maximize conversions using a target CPA</p>
                      <p>Bid more efficiently with Maximize conversion value using a target ROAS</p>
                      <p>Set a target CPA</p>
                      <p>Set a target CPA</p>
                      <p>Adjust your CPA targets</p>
                      <p>Adjust your ROAS targets</p>
                      <p>Add store visits as an account default goal</p>
                      <p>Upgrade your conversion tracking</p>
                      <p>Remove redundant keywords</p>
                      <p>Remove non-serving keywords</p>
                      <p>Add new keywords</p>
                      <p>Remove conflicting negative keywords</p>
                      <p>Use optimized targeting</p>
                      <p>Add broad match keywords</p>
                      <p>Use Display Expansion</p>
                      <p>Use optimized ad rotation</p>
                      <p>Add responsive search ads</p>
                      <p>Improve your responsive search ads</p>
                    </div>
                  </div>
                  <div className='right-area'>
                    <p>Recommendations are customized suggestions to help you optimize performance. Save time by automatically applying recommendations every time they're available.</p>
                    <a href='#'>Go to auto-apply settings</a>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel11`} onChange={handleChange(`panel11`)}>
            <AccordionSummary aria-controls={`panel11`} id={`panel11`}>
              <Typography>Lead form ads terms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group style-two'>
                    <div className='textbox'>
                      <p>You acknowledge and agree that the following terms govern your use of lead forms:</p>
                      <ul>
                        <li>You will request and use information from users (1) only as reasonably necessary for the limited purpose described in your lead forms and (2) in accordance with your privacy policy and any additional disclosures that you include in your lead forms. </li>
                        <li>You will not sell the information provided by users or otherwise abuse that information (for example, by spamming users with repeated phone calls or emails). </li>
                        <li>You will provide users with clear and comprehensive information about data collection and processing, including any sharing of users' information with third parties, and obtain consent for that collection and processing where legally required. You will not license or otherwise disclose the information you receive from users to a data broker.</li>
                        <li>You will comply with all applicable laws and regulations when contacting users or otherwise using the information they provide, including any marketing or spam regulations that may apply.</li>
                      </ul>
                      <p>You also acknowledge and agree that the following terms govern your use of the lead form webhook:</p>
                      <ul>
                        <li>You will comply with all webhook instructions provided by Google, including properly configuring an endpoint to handle POST requests. Google is not responsible for errors resulting from your misconfiguration of the webhook. </li>
                        <li>The webhook is provided in beta form. Google may discontinue, deprecate, or change the webhook at any time without notice, and Google does not guarantee availability, delivery of data, or technical support. </li>
                        <li>Your use of the webhook is governed by the Google API Terms of Service, available at https://developers.google.com/terms/ together with these terms.</li>
                      </ul>
                    </div>
                    <label>
                      <Checkbox />
                      I have read and accept the terms on behalf of my company
                    </label>
                  </div>
                  <div className='bottom-footer'>
                    <button className="btn-style-two">Cancel</button>
                    <button className="btn-style-one">Save</button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === `panel12`} onChange={handleChange(`panel12`)}>
            <AccordionSummary aria-controls={`panel12`} id={`panel12`}>
              <Typography>Customer Match</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='account-box'>
                <div className='account-detail'>
                  <div className='form-group style-two'>
                    <p>Smart Bidding and Optimized Targeting</p>
                    <label>
                      <Checkbox />
                      Use all Customer Match lists in Smart bidding and Optimized targeting
                    </label>
                    <div className='info-box'>
                      <p>
                        <i className='icon'><HelpOutlineIcon /></i>
                        Smart Bidding or Optimized Targeting will use all Customer Match lists available in your account from May 2022.
                      </p>
                    </div>
                    <p>Conversion tags</p>
                    <label>
                      <Checkbox />
                      Turn on conversion-based customer lists
                    </label>
                    <span>This will automatically create customer lists using data collected from customer via your conversion tags</span>
                    <div className='warning-box'>
                      <p>
                        <i className='icon'><WarningAmberIcon /></i>
                        You are not eligible for Customer match. Learn more about customer match policy.
                      </p>
                    </div>
                    <p>This data was collected and is being shared with Google in compliance with Google's Customer Match policies<br />
                      Your data will only be used to match your customers to Google accounts and to ensure your Customer Match campaigns comply with our policies. Learn more<br /> <br />
                      To comply with the General Data Protection Regulation (GDPR), we've included the Google Ads Data Processing Terms that apply to Customer Match in the Google Ads terms of service. Under these terms, Google acts as a "processor" of the personal data you may share with us for Customer Match. In your Account Preferences, confirm that the contact information for you (the primary contact) and your data protection officer and/or EU representative (if applicable) are up-to-date. Any notices under the Google Ads Data Processing Terms will be sent to the primary contact.</p>
                  </div>
                  <div className='bottom-footer'>
                    <button className="btn-style-two">Cancel</button>
                    <button className="btn-style-one">Save</button>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </div>
    </div>
  );
};


export default connect()(AccountSetting);