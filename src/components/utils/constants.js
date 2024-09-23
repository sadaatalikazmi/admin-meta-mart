const colors = ["#ffa500", "#2ECC40", "#FF4136", "#0074D9", "#B10DC9", "#FF851B", "#39CCCC", "#FFDC00", "#F012BE", "#AAAAAA", "#00000000", "#ffffff00"];

const percentages = Array.from({ length: 100 }, (_, i) => i + 1);

const visibilityPercentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const genders = ['Male', 'Female', 'Unknown'];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const hours = [
    { label: '12:00 AM', value: 0 },
    { label: '01:00 AM', value: 1 },
    { label: '02:00 AM', value: 2 },
    { label: '03:00 AM', value: 3 },
    { label: '04:00 AM', value: 4 },
    { label: '05:00 AM', value: 5 },
    { label: '06:00 AM', value: 6 },
    { label: '07:00 AM', value: 7 },
    { label: '08:00 AM', value: 8 },
    { label: '09:00 AM', value: 9 },
    { label: '10:00 AM', value: 10 },
    { label: '11:00 AM', value: 11 },
    { label: '12:00 AM', value: 12 },
    { label: '01:00 PM', value: 13 },
    { label: '02:00 PM', value: 14 },
    { label: '03:00 PM', value: 15 },
    { label: '04:00 PM', value: 16 },
    { label: '05:00 PM', value: 17 },
    { label: '06:00 PM', value: 18 },
    { label: '07:00 PM', value: 19 },
    { label: '08:00 PM', value: 20 },
    { label: '09:00 PM', value: 21 },
    { label: '10:00 PM', value: 22 },
    { label: '11:00 PM', value: 23 },
];

const productCategories = [
    'Bakery', 'Produce', 'Dairy', 'Chips & Snacks', 'Chocolates & Candies', 'Soft Drinks & Juices',
    'Cereals & Packets', 'Hygiene & Personal Care', 'Household Care', 'Ice Creams', 'Cans & Jars',
    'Pasta, Rice & Other', 'Herbs & Spices', 'Coffee & Tea', 'Shampoos & Haircare', 'Pet Care',
    'Butchery', 'Deli', 'Fishery', 'Frozen', 'Other'
];

const lifeEvents = [
    { day: `Ramadan`, date: 'N/A' },
    { day: `Women's Day`, date: '08-03' },
    { day: `Flower Day`, date: '21-03' },
    { day: `Water Day`, date: '22-03' },
    { day: `Labour Day`, date: '01-05' },
    { day: `Tea Day`, date: '21-05' },
    { day: `No-Tobacco Day`, date: '31-05' },
    { day: `Choclate Day`, date: '07-07' },
    { day: `Men's Day`, date: '19-11' },
    { day: `Children's Day`, date: '20-11' },
];

const bannerTypes = ['Awareness', 'Target'];

const slotTypes = ['Rack', 'Table', 'Roof', 'Checkout', 'Fridge', 'Wall'];

const ages = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

const frequencyCapRange = Array.from({ length: 50 }, (_, i) => i + 1);

const operatingSystems = ['Android', 'VR'];

const devices = ['Samsung', 'Oppo', 'Xiaomi', 'Vivo', 'One-Plus', 'Oculus'];

const citiesUAE = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Al Ain', 'Ajman', 'Ras al Khaimah', 'Fujairah', 'Umm Al Quwain'];

const basicAdAmount = 15;

const preApprovedMessages = [
    'Your ad is approved.',
    'Bad graphics',
    'Inappropriate image',
];

const formatWord = (str) => str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const formatMoment = (momentStr) => {
    const date = new Date(momentStr);
    const formattedMoment = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
    return formattedMoment;
};

export default {
    colors,
    percentages,
    visibilityPercentages,
    genders,
    daysOfWeek,
    hours,
    productCategories,
    lifeEvents,
    bannerTypes,
    slotTypes,
    ages,
    ageGroups,
    frequencyCapRange,
    devices,
    operatingSystems,
    citiesUAE,
    basicAdAmount,
    preApprovedMessages,
    formatWord,
    formatMoment,
};