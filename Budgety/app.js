// BUDGET CONTROLLER
const budgetController = (function () {

})();

// UI CONTROLLER
const UIController = (function () {

    let domElements = {
        inputType: document.querySelector(".add__type"),
        inputDescription: document.querySelector(".add__description"),
        inputValue: document.querySelector(".add__value"),
        inputBtn: document.querySelector(".add__btn")
    };
    return {
        getInput: function () {
            return {
                type: domElements.inputType.value, // will be either inc or exp
                description: domElements.inputDescription.value,
                value: domElements.inputValue.value,

            };
        },
        getDomElements: function () {
            return domElements;
        }
    };
})();

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    let dom = UICtrl.getDomElements();
    let ctrlAddItem = function () {

        // 1. Get the filed input data
        let input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI
    };

    dom.inputBtn.addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })
})(budgetController, UIController);