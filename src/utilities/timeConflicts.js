const splitDateTime = (classTime) => classTime.split(' ');

function splitByLowercase(str) {
    return str.match(/[A-Z][a-z]*/g);
}

const commonDates = (dateA, dateB) => {
    const setA = new Set(splitByLowercase(dateA));
    const setB = new Set(splitByLowercase(dateB));

    return [...setA].some(day => setB.has(day));
}

const isEarlier = (timeA, timeB) => {
    const [timeAHour, timeAMinutes] = timeA.split(':');
    const [timeBHour, timeBMinutes] = timeB.split(':');

    if (timeAHour < timeBHour) return true;
    return timeAHour === timeBHour && timeAMinutes < timeBMinutes;
}

const timesOverlap = (timeA, timeB) => {
    const [timeAStart, timeAEnd] = timeA.split('-');
    const [timeBStart, timeBEnd] = timeB.split('-');

    return isEarlier(timeAStart, timeBEnd) && isEarlier(timeBStart, timeAEnd);


    // const overlapA = isEarlier(timeAStart, timeBEnd) && isEarlier(timeBEnd, timeAEnd);
    // const overlapB = isEarlier(timeBStart, timeAEnd) && isEarlier(timeAEnd, timeBEnd);

    // return overlapA || overlapB;
}

const isPairwiseConflict = (a, b) => {
    const [termA, scheduleA] = a.split(',');
    const [termB, scheduleB] = b.split(',');

    if (termA !== termB) return false;

    const [dateA, timeA] = splitDateTime(scheduleA);
    const [dateB, timeB] = splitDateTime(scheduleB);

    if (!commonDates(dateA, dateB)) return false;

    return timesOverlap(timeA, timeB);
}

export const isConflict = (course, schedule) => {
    return schedule.some((scheduleClass) => isPairwiseConflict(course, scheduleClass))
}