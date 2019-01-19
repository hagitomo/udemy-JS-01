/*
機能
1. 入力イベント(ボタン)
2. 入力値取得
3. 入力値をdataに保存
4. uiにアイテムを追加
5. 総額を計算
6. 画面を更新


UI module
2. 入力値取得
4. uiにアイテムを追加
6. 画面を更新

DATA module
3. 入力値をdataに保存
5. 総額を計算

CONTOROLLER module
1. 入力イベント(ボタン)

*/

// data
var budgetController = (function() {

  // 支出のデータ
  var Expense = function( id, description, value, percentage ) {
    this.id = id
    this.description = description
    this.value = value
    this.percentage = -1
  }

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100)
    } else {
      this.percentage = -1
    }
  }

  Expense.prototype.getPercentage = function() {
    return this.percentage
  }

  // 収入のデータ
  var Income = function( id, description, value ) {
    this.id = id;
    this.description = description
    this.value = value
  }

  // 総額計算
  var calculateTotal = function(type) {
    data.totals[type] =  data.allitems[type].map((item) => item.value).reduce((a, b) => a + b, 0)
  }

  // データを格納
  var data = {
    allitems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: 0
  }

  return {
    // アイテムを追加
    addItem: function(type, des, val) {
      var newItem;
      var ID;

      // ID作成: アイテム配列の最期のアイテムのidに1を足したもの
      if ( data.allitems[type].length > 0 ) {
        ID = data.allitems[type][data.allitems[type].length - 1].id + 1
      } else {
        ID = 1
      }

      // typeによって支出 or 収入
      if ( type === 'exp' ) {
        newItem = new Expense(ID, des, val)
      } else if ( type === 'inc' ) {
        newItem = new Income(ID, des, val)
      }
      // typeのデータの配列に追加
      data.allitems[type].push(newItem)

      // 追加したアイテムを返す
      return newItem
    },

    // アイテム削除
    deleteItem: function(itemType, itemId) {
      var idArray = data.allitems[itemType].map((item) => item.id)
      var itemIndex = idArray.indexOf(itemId)

      if (itemIndex !== -1) {
        data.allitems[itemType].splice(itemIndex, 1)
      }
    },

    // 総額計算
    calculateBudget: function() {
      calculateTotal('exp')
      calculateTotal('inc')
      // 総額
      data.budget = data.totals['inc'] - data.totals['exp']
      // percent
      if (data.budget > 0) {
        data.percentage = Math.round(( data.totals['exp'] / data.totals['inc'] ) * 100)
      } else {
        data.percentage = -1
      }
    },

    // 総額を取得する関数
    getBudget : function() {
      return {
        budget: data.budget,
        totalInc : data.totals.inc,
        totalExp : data.totals.exp,
        percentage : data.percentage
      }
    },

    // 支出の割合計算
    calculatePercentage: function() {
      data.allitems.exp.forEach((item) => {
        item.calcPercentage(data.totals.inc)
      })
    },

    // 支出の割合取得
    getPercentage: function() {
      var percentages = data.allitems.exp.map((item) => item.percentage)
      return percentages
    }
  }
})()

// UI
var UIContoroller = (function() {
  var DOMstrings = {
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    addBtn: '.add__btn',
    budgetVal: '.budget__value',
    budgetIncomeVal: '.budget__income--value',
    budgetIncomePer: '.budget__income--percentage',
    budgetExpenseVal: '.budget__expenses--value',
    budgetExpensePer: '.budget__expenses--percentage',
    itemValue: '.item__value',
    container: '.container',
    incomeList: '.income__list',
    expensesList: '.expenses__list',
    deleteBtn: '.item__delete--btn',
    expPer: '.item__percentage'
  }

  return {
    // DOMstringを渡す
    getDOMStrings: function() {
      return DOMstrings
    },

    // 入力値を取得
    getinput: function() {
      return {
        type : document.querySelector( DOMstrings.inputType ).value,
        description : document.querySelector( DOMstrings.inputDescription ).value,
        value : parseInt(document.querySelector( DOMstrings.inputValue ).value)
      }
    },

    // アイテムを表示
    displayItem: function(type, item) {
      var html;
      var ul;

      if (type === 'exp') {
        html =
        `<div class="item clearfix" id="exp-${item.id}"><div class="item__description">${item.description}</div><div class="right clearfix"><div class="item__value">- ${item.value}</div><div class="item__percentage"></div><div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
    </div>`

        ul = DOMstrings.expensesList
      } else if ( type === 'inc') {
        html =
        `
        <div class="item clearfix" id="inc-${item.id}"><div class="item__description">${item.description}</div><div class="right clearfix"><div class="item__value">+ ${item.value}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`

        ul = DOMstrings.incomeList
      }
      document.querySelector( ul ).insertAdjacentHTML('beforeend', html)
    },

    // アイテム削除
    removeItem: function(type, id) {
      var targetId = type + '-' + id
      var targetItem = document.getElementById(targetId)
      targetItem.parentNode.removeChild(targetItem)
    },

    // 入力欄 入力値削除
    clearFields: function() {
      document.querySelector(DOMstrings.inputType).value = 'inc'
      var fields  = document.querySelectorAll(DOMstrings.inputDescription +','+ DOMstrings.inputValue)
      var vals = Array.prototype.slice.call(fields)
      vals.forEach((el) => {
        el.value = ''
      })
    },

    // 総額, %表示
    displayBudget: function(budget) {
      document.querySelector(DOMstrings.budgetVal).textContent = budget.budget
      document.querySelector(DOMstrings.budgetIncomeVal).textContent = budget.totalInc
      document.querySelector(DOMstrings.budgetExpenseVal).textContent = budget.totalExp
      if(budget.percentage > 0) {
        document.querySelector(DOMstrings.budgetExpensePer).textContent = budget.percentage + '%'
      } else {
        document.querySelector(DOMstrings.budgetExpensePer).textContent = '---'
      }
    },

    // 支出割合表示
    displayPercentage: function(percentage) {
      var percentageNodes = document.querySelectorAll(DOMstrings.expPer)
      var percentageVals = Array.prototype.slice.call(percentageNodes)
      percentageVals.forEach((el, i) => {
        if (percentage[i] > 0) {
          percentageVals[i].textContent = percentage[i] + '%'
        } else {
          percentageVals[i].textContent = '---'
        }
      })

    }
  }
})()

// GLOBAL
var contoroller = (function(budgetCtrl, UICtrl) {
  // イベントリスナ設定
  var setupEventListeners = function() {
    var DOMstrings = UICtrl.getDOMStrings()

    // 数値入力イベント
    document.querySelector(DOMstrings.addBtn).addEventListener('click', ctrlAddItem)
    document.addEventListener('keypress', function( event ) {
      if(event.keycode === 13 || event.which === 13) {
        ctrlAddItem()
      }
    })

    // 入力したアイテムを削除(初期状態では存在しないので event deligation利用)
    document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem)
  }

  // 総額計算
  var updateBudget = function() {
    // 総額, ％ 計算
    budgetCtrl.calculateBudget()
    // 総額, % 取得
    var budget = budgetCtrl.getBudget()
    // UIに表示
    UICtrl.displayBudget(budget)
  }

  // 支出のpercent計算
  var updatePercetage = function() {
    // 1.percent計算
    budgetCtrl.calculatePercentage()

    // 2.計算結果取得
    var percentage = budgetCtrl.getPercentage()

    // 3.UIに表示
    UICtrl.displayPercentage(percentage)
  }

  // 入力してUI表示
  var ctrlAddItem = function() {
    // 1. 入力値取得
    var input = UICtrl.getinput()

    if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
      // 2. budgetcontrollerに値を渡し、アイテム追加
      var newItem = budgetCtrl.addItem( input.type, input.description, input.value )

      // 3. UIにアイテム表示
      UICtrl.displayItem(input.type, newItem)
      UICtrl.clearFields()

      // 4. 総額を計算・表示
      updateBudget()

      // 5. 各支出の割合算出・表示
      updatePercetage()
    }
  }

  // アイテム削除
  var ctrlDeleteItem = function(event) {
    var itemID, itemType
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if(itemID) {
      itemType = itemID.split('-')[0]
      itemID = parseInt(itemID.split('-')[1])
    }
    // 1. アイテムをデータから削除
    budgetCtrl.deleteItem(itemType, itemID)

    // 2. UIからアイテムを削除
    UICtrl.removeItem(itemType, itemID)

    // 3. 総額を再計算・表示
    updateBudget()
  }

  // 初期化
  return {
    init: function() {
      console.log('App start')
      updateBudget({
        budget: 0,
        totalInc : 0,
        totalExp : 0,
        percentage : 0
      })
      setupEventListeners()
    }
  }


})(budgetController, UIContoroller)

contoroller.init()
