let passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "012345678901",
        flightNumber: "VN202",
        seatNumber: "",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Binh",
        idNumber: "A1234567",
        flightNumber: "VN202",
        seatNumber: "",
        isCheckedIn: false
    }
];

let seats = ["12A", "12B", "12C", "14A", "14B", "14C"];

function findPassengerByPnr(pnrCode) {
    return passengers.find(function(passenger) {
        return passenger.pnrCode.toUpperCase() === pnrCode.trim().toUpperCase();
    });
}

function validateIdNumber(idNumber) {
    let value = idNumber.trim();

    let isCitizenId = /^[0-9]{12}$/.test(value);
    let isPassport = /^[A-Za-z][0-9]{7,8}$/.test(value);

    return isCitizenId || isPassport;
}

function isIdNumberUsed(idNumber) {
    return passengers.some(function(passenger) {
        return passenger.idNumber.toUpperCase() === idNumber.trim().toUpperCase();
    });
}

function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    if (findPassengerByPnr(pnrCode)) {
        console.log("Ma PNR da ton tai!");
        return;
    }

    let passengerName = prompt("Nhap ho ten hanh khach:");

    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong hop le!");
        return;
    }

    let idNumber = prompt("Nhap CCCD hoac ho chieu:");

    if (idNumber === null || !validateIdNumber(idNumber)) {
        console.log("Giay to khong hop le!");
        return;
    }

    if (isIdNumberUsed(idNumber)) {
        console.log("Giay to nay da duoc dang ky!");
        return;
    }

    let flightNumber = prompt("Nhap so hieu chuyen bay:");

    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("So hieu chuyen bay khong hop le!");
        return;
    }

    passengers.push({
        pnrCode: pnrCode.trim().toUpperCase(),
        passengerName: passengerName.trim(),
        idNumber: idNumber.trim().toUpperCase(),
        flightNumber: flightNumber.trim().toUpperCase(),
        seatNumber: "",
        isCheckedIn: false
    });

    console.log("Them ho so hanh khach thanh cong!");
}

function findAvailableSeat(flightNumber) {
    for (let i = 0; i < seats.length; i++) {
        let seatIsUsed = passengers.some(function(passenger) {
            return passenger.flightNumber.toUpperCase() === flightNumber.toUpperCase()
                && passenger.seatNumber === seats[i];
        });

        if (!seatIsUsed) {
            return seats[i];
        }
    }

    return "";
}

function displayBoardingPass(passenger) {
    console.log("========================================");
    console.log("             BOARDING PASS");
    console.log("========================================");
    console.log("PNR CODE      :", passenger.pnrCode);
    console.log("PASSENGER     :", passenger.passengerName);
    console.log("FLIGHT        :", passenger.flightNumber);
    console.log("SEAT          :", passenger.seatNumber);
    console.log("CHECK-IN      :", passenger.isCheckedIn ? "CONFIRMED" : "NOT CHECKED IN");
    console.log("----------------------------------------");
    console.log("|||| ||| | |||| || ||| |||| || | |||");
    console.log("========================================");
}

function checkInPassenger() {
    let pnrCode = prompt("Nhap ma PNR can check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    let passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Khong tim thay hanh khach!");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in truoc do!");
        displayBoardingPass(passenger);
        return;
    }

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Giay to khong hop le. Khong the check-in!");
        return;
    }

    let seatNumber = findAvailableSeat(passenger.flightNumber);

    if (seatNumber === "") {
        console.log("Chuyen bay da het ghe!");
        return;
    }

    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;

    console.log("Xac thuc giay to thanh cong!");
    console.log("Check-in thanh cong!");
    displayBoardingPass(passenger);
}

function searchPassenger() {
    let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Vui long nhap thong tin tim kiem!");
        return;
    }

    let result = passengers.filter(function(passenger) {
        return passenger.pnrCode.toLowerCase() === keyword.trim().toLowerCase()
            || passenger.passengerName.toLowerCase().includes(keyword.trim().toLowerCase());
    });

    if (result.length === 0) {
        console.log("Khong tim thay hanh khach!");
    } else {
        console.table(result);
    }
}

function displayPassengers() {
    if (passengers.length === 0) {
        console.log("Danh sach hanh khach trong!");
        return;
    }

    console.table(passengers);
}

function showMenu() {
    console.log("===== PASSENGER CHECK-IN SYSTEM =====");
    console.log("1. Them ho so hanh khach");
    console.log("2. Check-in va in Boarding Pass");
    console.log("3. Tim kiem hanh khach");
    console.log("4. Hien thi danh sach");
    console.log("5. Thoat");
}

function main() {
    let menuChoice;

    do {
        showMenu();
        menuChoice = prompt("Nhap lua chon (1-5):");

        switch (menuChoice) {
            case "1":
                addPassenger();
                break;
            case "2":
                checkInPassenger();
                break;
            case "3":
                searchPassenger();
                break;
            case "4":
                displayPassengers();
                break;
            case "5":
                console.log("Ket thuc chuong trinh!");
                break;
            case null:
                console.log("Da dong menu!");
                break;
            default:
                console.log("Lua chon khong hop le!");
        }
    } while (menuChoice !== "5" && menuChoice !== null);
}

main();
