let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

const denomValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

purchaseBtn.addEventListener("click", () => {
    changeDue.innerText = "";
    const cashValue = Number(cash.value);
    if (cashValue < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cashValue === price) {
        changeDue.innerText = "No change due - customer paid with exact cash";
        return;
    } else if (cashValue > price) {
        let changeAmount = cashValue - price;
        changeAmount = Math.round(changeAmount * 100) / 100;


        const totalCid = cid.reduce((acc, curr) => acc + curr[1], 0);
        if (totalCid < changeAmount) {
            changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
            return;
        }

        if (totalCid === changeAmount) {

            let closedCidSorted = cid
                .slice()
                .sort((a, b) => denomValues[b[0]] - denomValues[a[0]])
                .filter(([_, amount]) => amount > 0);

            let closedText = "Status: CLOSED ";
            closedText += closedCidSorted.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(" ");
            changeDue.innerText = closedText;
            return;
        }


        const denominations = [
            ["ONE HUNDRED", 100],
            ["TWENTY", 20],
            ["TEN", 10],
            ["FIVE", 5],
            ["ONE", 1],
            ["QUARTER", 0.25],
            ["DIME", 0.1],
            ["NICKEL", 0.05],
            ["PENNY", 0.01]
        ];

        const changeToGive = [];
        for (let i = 0; i < denominations.length; i++) {
            const [name, value] = denominations[i];
            const drawerAmount = cid.find(row => row[0] === name)[1];
            let amountTaken = 0;
            while (changeAmount >= value && amountTaken + value <= drawerAmount) {
                changeAmount = Math.round((changeAmount - value) * 100) / 100;
                amountTaken = Math.round((amountTaken + value) * 100) / 100;
            }
            if (amountTaken > 0) {
                changeToGive.push([name, amountTaken]);
            }
        }

        if (changeAmount > 0) {
            changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
            return;
        }

        let resultText = "Status: OPEN " + changeToGive.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(" ");
        changeDue.innerText = resultText;
    }
});
