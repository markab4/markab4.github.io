// BUDGET CONTROLLER
const budgetController = (function () {
    let Expense = function (id, description, value) { // constructor
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        this.percentage = (totalIncome > 0) ? Math.round(this.value / totalIncome * 100) : -1;
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    let Income = function (id, description, value) { // constructor
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (curr) {
            sum += curr.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            // Create new ID, incrementing on last ID, or setting to 0 if it is the first element
            let ID = (data.allItems[type].length) ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;

            // Create new item based on "inc" or "exp" type
            let newItem = (type === "exp") ? new Expense(ID, des, val) : new Income(ID, des, val);

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        deleteItem: function (type, id) {
            let ids = data.allItems[type].map(function (current) {
                return current.id;
            });
            let index = ids.indexOf(id);

            if (index > -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            // calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");

            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate % of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            return data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
const UIController = (function () {

    let domElements = {
        inputType: document.querySelector(".add__type"),
        inputDescription: document.querySelector(".add__description"),
        inputValue: document.querySelector(".add__value"),
        inputBtn: document.querySelector(".add__btn"),
        incomeContainer: document.querySelector('.income__list'),
        expensesContainer: document.querySelector('.expenses__list'),
        budgetLabel: document.querySelector('.budget__value'),
        incomeLabel: document.querySelector('.budget__income--value'),
        expensesLabel: document.querySelector('.budget__expenses--value'),
        percentageLabel: document.querySelector('.budget__expenses--percentage'),
        container: document.querySelector(".container"),
        expensesPercLabels: ".item__percentage",
        dateLabel: document.querySelector('.budget__title--month')
    };

    let formatNumber = function(num, type) {
        // + or - before number
        // exactly 2 decimal places
        // comma separating the thousands

        let numSplit = Math.abs(num).toFixed(2).split(".");
        console.log(numSplit);
        let int = numSplit[0];
        let dec = numSplit[1];

        if(int.length > 3) {
            int  = int.substr(0, int.length - 3) + "," + int.substr(int.length-3, 3);
        }
        return (type === "exp" ? "- " : "+ ") + int + "." + dec;

    };

    return {
        getInput: function () {
            return {
                type: domElements.inputType.value, // will be either inc or exp
                description: domElements.inputDescription.value,
                value: parseFloat(domElements.inputValue.value),
            };
        },

        addListItem: function (obj, type) {
            // Create HTML string with placeholder text
            let html, element;
            if (type === "inc") {
                element = domElements.incomeContainer;
                html = "<div class=\"item clearfix\" id=\"inc-%id%\">\n" +   // if type is income
                    "  <div class=\"item__description\">%description%</div>\n" +
                    "  <div class=\"right clearfix\">\n" +
                    "  <div class=\"item__value\">%value%</div>\n" +
                    "  <div class=\"item__delete\">\n" +
                    "  <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n" +
                    "  </div>\n" +
                    "  </div>\n" +
                    "  </div>";
            } else {
                element = domElements.expensesContainer;
                html = "<div class=\"item clearfix\" id=\"exp-%id%\">\n" +
                    "  <div class=\"item__description\">%description%</div>\n" +
                    "  <div class=\"right clearfix\">\n" +
                    "  <div class=\"item__value\">%value%</div>\n" +
                    "  <div class=\"item__percentage\">21%</div>\n" +
                    "  <div class=\"item__delete\">\n" +
                    "  <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n" +
                    "  </div>\n" +
                    "  </div>\n" +
                    "  </div>";
            }

            // Replace the placeholder text with some actual data
            html = html.replace('%id', obj.id)
                .replace("%description%", obj.description)
                .replace("%value%", formatNumber(obj.value));
            //Insert HTML into the DOM
            element.insertAdjacentHTML("beforeend", html);
        },

        deleteListItem: function (selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;
            fields = document.querySelectorAll("." + domElements.inputDescription.className + ", ." +
                domElements.inputValue.className);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            let type = obj.budget >= 0 ? "inc" : "exp";

            domElements.budgetLabel.textContent = formatNumber(obj.budget);
            domElements.incomeLabel.textContent = formatNumber(obj.totalInc, "inc");
            domElements.expensesLabel.textContent = formatNumber(obj.totalExp, "exp");

            domElements.percentageLabel.textContent = (obj.percentage > 0) ? obj.percentage + "%" : "---";
        },

        displayPercentages: function (percentages) {

            let nodeListForEach = function (list, callback) {
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
            nodeListForEach(document.querySelectorAll(domElements.expensesPercLabels), function (current, index) {
                current.textContent = percentages[index] > 0 ? percentages[index] + "%" : "---";
            });
        },

        displayMonth: function() {
            let now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            domElements.dateLabel.textContent = months[now.getMonth()] + " " + year;
        },

        getDomElements: function () {
            return domElements;
        }
    };
})();

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    let setUpEventListeners = function () {
        let dom = UICtrl.getDomElements();
        dom.inputBtn.addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        dom.container.addEventListener("click", ctrlDeleteItem);
    };

    let updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = budgetController.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    };

    let updatePercentages = function () {
        //calculate percentages
        budgetCtrl.calculatePercentages();

        // read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();

        // update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    let ctrlAddItem = function () {
        let input, newItem;

        // Get the filed input data
        input = UICtrl.getInput();
        if (input.description && input.value && input.value > 0) {
            // Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);
            // Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // Clear the fields
            UICtrl.clearFields();
            // Calculate and update Budget
            updateBudget();

            // calculate and update percentages
            updatePercentages();
        }
    };

    let ctrlDeleteItem = function (event) {
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            let splitID = itemID.split("-");
            let type = splitID[0];
            let ID = parseInt(splitID[1]);

            // delete item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // update and show the new budget
            updateBudget();

            // calculate and update percentages
            updatePercentages();

        }
    };

    return {
        init: function () {
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setUpEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();