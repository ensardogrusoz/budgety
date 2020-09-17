var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    };

    return {
        addItem: function(type, des, val){
            var newItem, ID;

            ID = 0;

            //ID = new ID + 1, so we dont have the same ID for different items
            //create new id
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            

            //create newItem bases on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID,des,val);
            }

            //push into data structure
            data.allItems[type].push(newItem);
            //return new element
            return newItem;
            

        }
    };

})();

var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        addListItem: function(obj,type){
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            
            //replace placeholder text with data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert HTML into DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        }, 
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            })
            fieldsArr[0].focus();
        },
        getDOMStrings:function(){
            return DOMStrings;
        }

    }
})();


var controller = (function(budgetCtrl,UICtrl){

    var setupEventListeners = function(){
        var DOM = UIController.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem)

        document.addEventListener('keypress',function(e){
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        })
    }


    var ctrlAddItem = function(){
        var input, newItem;

        //1.get field input data
        input = UICtrl.getInput();

        //2.add item to budgetcontoller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        //3.add item to UI
        UICtrl.addListItem(newItem, input.type);

        UICtrl.clearFields();
        //4.calculate budget

        //5.display budget on UI
    
    }

    return{
        init: function(){
            console.log('Application has started')
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();