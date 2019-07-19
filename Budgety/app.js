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

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            // Create new ID, incrementing on last ID, or setting to 0 if it is the first element
            console.log(data);
            let ID = (data.allItems[type].length) ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;

            // Create new item based on "inc" or "exp" type
            let newItem = (type === "exp") ? new Expense(ID, des, val) : new Income(ID, des, val);

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
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
        expensesContainer: document.querySelector('.expenses__list')
    };
    return {
        getInput: function () {
            return {
                type: domElements.inputType.value, // will be either inc or exp
                description: domElements.inputDescription.value,
                value: domElements.inputValue.value,

            };
        },

        addListItem: function (obj, type) {
            // Create HTML string with placeholder text
            let html, element;
            if (type === "inc") {
                element = domElements.incomeContainer;
                html = "<div class=\"item clearfix\" id=\"income-%id%\">\n" +   // if type is income
                    "                            <div class=\"item__description\">%description%</div>\n" +
                    "                            <div class=\"right clearfix\">\n" +
                    "                                <div class=\"item__value\">%value%</div>\n" +
                    "                                <div class=\"item__delete\">\n" +
                    "                                    <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>";
            } else {
                element = domElements.expensesContainer;
                html = "<div class=\"item clearfix\" id=\"expense-%id%\">\n" +
                    "                            <div class=\"item__description\">%description%</div>\n" +
                    "                            <div class=\"right clearfix\">\n" +
                    "                                <div class=\"item__value\">- %value%</div>\n" +
                    "                                <div class=\"item__percentage\">21%</div>\n" +
                    "                                <div class=\"item__delete\">\n" +
                    "                                    <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n" +
                    "                                </div>\n" +
                    "                            </div>\n" +
                    "                        </div>";
            }

            // Replace the placeholder text with some actual data
            html = html.replace('%id', obj.id)
                .replace("%description%", obj.description)
                .replace("%value%", obj.value);
            //Insert HTML into the DOM
            element.insertAdjacentHTML("beforeend", html);
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
    };

    let ctrlAddItem = function () {
        let input, newItem;

        // 1. Get the filed input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget
        // 5. Display the budget on the UI
    };

    return {
        init: function () {
            setUpEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();