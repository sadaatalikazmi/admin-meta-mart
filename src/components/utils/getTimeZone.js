import { DateTime } from 'luxon';

const getTimeZone = () => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const gmtHours = DateTime.now().setZone(zone).toFormat('ZZ');

    const timeZone = `(GMT${gmtHours}) ${zone}`;

    return timeZone;
};

export default getTimeZone;