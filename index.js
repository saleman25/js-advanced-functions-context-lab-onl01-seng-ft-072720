/* Your Code Here */

function createEmployeeRecord(record){
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
};

let createEmployeeRecords = function(dataset){
    return dataset.map(function(data){
        return createEmployeeRecord(data)
    });
};

let createTimeInEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this
};

let createTimeOutEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this
};

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    });
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    });
    return (outEvent.hour - inEvent.hour) / 100
};

let wagesEarnedOnDate = function(workDate){
    let earnings = hoursWorkedOnDate.call(this, workDate) * this.payPerHour
    return parseFloat(earnings.toString())
};



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(collection, firstNameString){
    return collection.find(function(name){
        return name.firstName === firstNameString
    });
};

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0);
};