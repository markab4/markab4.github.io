// BUDGET CONTROLLER
const budgetController = (function () {
    let Expense = function (id, description, value) { // constructor
        this.id = id;
        this.description = description;
        this.value = value;
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

        deleteItem: function(type, id){
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
        container: document.querySelector(".container")
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
                    "  <div class=\"item__value\">- %value%</div>\n" +
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
                .replace("%value%", obj.value);
            //Insert HTML into the DOM
            element.insertAdjacentHTML("beforeend", html);
        },

        deleteListItem: function(selectorID){
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            let fields, fieldsArr;
            fields = document.querySelectorAll("." + domElements.inputDescription.className + ", ." +
                domElements.inputValue.className);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            domElements.budgetLabel.textContent = obj.budget;
            domElements.incomeLabel.textContent = obj.totalInc;
            domElements.expensesLabel.textContent = obj.totalExp;

            domElements.percentageLabel.textContent = (obj.percentage > 0) ? obj.percentage + "%" : "---";
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

        }
    };

    return {
        init: function () {
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