function createEmployeeRecord(arr) {
    const employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3], 
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeRecord;
}

function createEmployeeRecords(arraysOfArrays) {
    const employeeRecords = [];
    for (const employeeData of arraysOfArrays) {
        employeeRecords.push(createEmployeeRecord(employeeData));
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const parsedHour = parseInt(hour, 10);
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parsedHour, 
        date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const parsedHour = parseInt(hour, 10);
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parsedHour, 
        date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    }

    return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;

    return payOwed;
}

function allWagesFor(employeeRecord) {
    let totalPay = 0;

    employeeRecord.timeInEvents.forEach(timeInEvent => {
        const date = timeInEvent.date;
        totalPay += wagesEarnedOnDate(employeeRecord, date);
    });

    return totalPay;
}

function calculatePayroll(employeeRecords) {
    let totalPay = 0;
    employeeRecords.forEach(employeeRecord => {
        const uniqueDates = [...new Set(employeeRecord.timeInEvents.map(event => event.date))];
        uniqueDates.forEach(date => {
            totalPay += wagesEarnedOnDate(employeeRecord, date);
        });
    });

    return totalPay;
}



