/* Your Code Here */
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(createEmployeeRecord);
};

function createTimeEvent(recordObject, date, eventType) {
    const [eventDate, eventTime] = date.split(" ");
    const event = {
        type: eventType,
        hour: parseInt(eventTime),
        date: eventDate,
    };

    if (eventType === "TimeIn") {
        recordObject.timeInEvents.push(event);
    } else if (eventType === "TimeOut") {
        recordObject.timeOutEvents.push(event);
    }

    return recordObject;
}

function calculateHoursWorked(record, date) {
    for (let i = 0; i < record.timeInEvents.length; i++) {
        if (date === record.timeInEvents[i].date) {
            const arrivalHour = record.timeInEvents[i].hour;
            const departureHour = record.timeOutEvents[i].hour;
            const hoursWorked = (departureHour - arrivalHour) / 100;
            return hoursWorked;
        }
    }
    return 0;
}

function wagesEarnedOnDate(record, date) {
    const hoursWorked = calculateHoursWorked(record, date);
    return hoursWorked * record.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
  
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable
  };

function calculatePayroll(employeeRecords) {
    const totalWagesArray = employeeRecords.map((employee) => {
        return allWagesFor.call(employee);
    });

    const totalPayroll = totalWagesArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    return totalPayroll;
}
