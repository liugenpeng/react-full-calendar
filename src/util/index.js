import moment from 'moment';

export function getTodayTime(value) {
    const today = moment();
    today.locale(value.locale()).utcOffset(value.utcOffset());
    return today;
}

export function getTitleString(value) {
    return `${value.year()}-${value.month() + 1}-${value.date()}`;
}

export function getNow() {
    return moment();
}

export function getNowByCurrentStateValue(value) {
    let ret;
    
    if (value) {
        ret = getTodayTime(value);
    } else {
        ret = getNow();
    }

    return ret;
}

export function inCurrentMonthYear(current, today) {
    return current.year() === today.year() &&
        current.month() == today.month();
}

