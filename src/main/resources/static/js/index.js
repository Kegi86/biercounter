/**
 * Handles the keyboard event. In case of ENTER (13) it saves a new todoItem or updates
 * an existing one
 * @param e keyboard event
 */
function handleEnterKey(e) {
    if (e.keyCode === 13) {
        e.preventDefault(); // Ensure it is only this code that run
        let taskName = document.getElementById('taskNameTextField').value
        // Clear input field!
        let taskNameTextField = $("#taskNameTextField");
        taskNameTextField.val('');

        // Check if we are editing or not!
        let isEditing = taskNameTextField.attr("isEditing");

        if (isEditing) {
            // clear editing flag.
            taskNameTextField.removeAttr("isEditing");
            let itemId = taskNameTextField.attr("editingItemId");
            taskNameTextField.removeAttr("editingItemId");
            putEditDrinkingPerson(itemId, taskName, glistId);
        } else {
            postNewDrinkingPerson(taskName, glistId);
        }
    }
}

/**
 * Handles the change of the todoItem status
 * @param ele the todoItem
 */
function changeDoneState(ele) {
    let itemId = $(ele).attr("id"); // get the item id!
    $.ajax({
        type: "PUT",
        url: "/api/v1/state/" + itemId,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                newListItem.addClass('completed')
            }

            createDrinkerRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}

/**
 * Handles the change of the DrinkingPerson status
 * @param ele the todoItem
 */
function doDecrement(ele) {
    let itemId = $(ele).attr("id"); // get the item id!
    $.ajax({
        type: "PUT",
        url: "/api/v1/decrement/" + itemId,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                // newListItem.addClass('completed')
            }

            createDrinkerRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}


/**
 * Handles the change of the todoItem status
 * @param ele the todoItem
 */
function doIncrement(ele) {
    let itemId = $(ele).attr("id"); // get the item id!
    $.ajax({
        type: "PUT",
        url: "/api/v1/increment/" + itemId,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                // newListItem.addClass('completed')
            }

            createDrinkerRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}

/**
 * Handles the change of the todoItem status
 * @param ele the todoItem
 */
function doPayed(ele) {
    let itemId = $(ele).attr("id"); // get the item id!

    let manyBier = parseInt(prompt("How many Bier you want to pay?", ''));
    if (isNaN(manyBier)) {
        parseInt(prompt("It is not a number. Please enter a number, "));
    } else {

        $.ajax({
            type: "PUT",
            url: "/api/v1/manypayed/" + itemId + "/" + manyBier,
            success: function (data) {
                // Create new list item
                let newListItem = $('<li/>')
                    .attr("id", "item" + data.itemId);

                if (data.done) {
                    // newListItem.addClass('completed')
                }

                createDrinkerRow(newListItem, data);

                // Replace the old one by the new one
                let oldListItem = $("#item" + itemId);
                oldListItem.replaceWith(newListItem);
            },
            error: function (data) {
            }

        });
    }
}

//funktion 1 bier bezahlt
function doPayOne(ele) {
    let itemId = $(ele).attr("id"); // get the item id!
    $.ajax({
        type: "PUT",
        url: "/api/v1/payone/" + itemId,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                // newListItem.addClass('completed')
            }

            createDrinkerRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}
/**
 * Updates an existing todoItem in terms of taskName. The old item
 * is replaced in the todoList by the newItem from the backend.
 * @param itemId    the todoItem id
 * @param taskName  the name of the task to do
 * @param listId    the listId as UUID
 */
function putEditDrinkingPerson(itemId, taskName, listId, bierDrank, bierPaid) {
    let drinkingPerson = {
        itemId: itemId,
        taskName: taskName,
        listId: listId,
        bierDrank: bierDrank,
        bierPaid: bierPaid,
    };
    let requestJSON = JSON.stringify(drinkingPerson);
    $.ajax({
        type: "PUT",
        url: "/api/v1/edit",
        headers: {
            "Content-Type": "application/json"
        },
        data: requestJSON,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                newListItem.addClass('completed')
            }

            createDrinkerRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + data.itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}

/**
 * Saves a new DrinkingPerson in the backend and creates a list item in the ul list
 * @param taskName the entered task name
 * @param listId   the unique list id with an UUID
 */
function postNewDrinkingPerson(taskName, listId) {
    let newDrinkingPerson = {
        taskName: taskName,
        listId: listId
    };
    let requestJSON = JSON.stringify(newDrinkingPerson);
    $.ajax({
        type: "POST",
        url: "/api/v1/new",
        headers: {
            "Content-Type": "application/json"
        },
        data: requestJSON,
        success: function (data) {
            let cList = $('ul.todo-list');
            let li = $('<li/>')
                .attr("id", "item" + data.itemId)
                .appendTo(cList);

            createDrinkerRow(li, data);
        },
        error: function (data) {
        }
    });
}

/**
 * Deletes a todoItem in the backend and deletes it from the list
 * @param ele the list todoItem
 */
function deleteTodoItem(ele) {
    let itemId = $(ele).attr("id"); // get the item id!

    if(confirm("Are your Sure you want delete this Person from the List?")) {

    $.ajax({
        type: "DELETE",
        url: "/api/v1/delete/" + itemId,
        success: function (data) {
            let oldItem = $("#item" + itemId);
            cuteHide(oldItem);
        },
        error: function (data) {
        }
    });} else { }
}

/**
 * Take the taskName ("todoTitle") from the list and copy it the the taskNameTextField
 * @param ele the edit a-tag from the list todoItem
 */
function editTodoItem(ele) {
    // first get item id
    let itemId = $(ele).attr("id");
    // then get list item we created before.
    let listItem = $("#item" + itemId);
    let titleSpan = listItem.find(".todo-title");
    //let valuesSpan = listItem.find(".values");

    // set the text field
    let taskNameTextField = $("#taskNameTextField");
    taskNameTextField.val(titleSpan.text());
    //taskNameTextField.val(valuesSpan.text());
    // set the attribute that we are editing!
    taskNameTextField.attr("isEditing", true);
    taskNameTextField.attr("editingItemId", itemId);
}

/**
 * Creates a row in the DrinkingPersonList
 * The line consists of an id, task name, a span with plus icon, minus icon, pay icon, payOne icon and delete icon
 * @param parent
 * @param data
 */
function createDrinkerRow(parent, data) {
    let DrinkerRow = $('<div/>')
        .addClass('todo-row')
        .appendTo(parent)

    // Task Name
    let todoTitle = $('<span/>')
        .addClass('drinker-title')
        .text(data.taskName)
        .appendTo(DrinkerRow);
//Beer Icon
    let bierIcon = $('<span/>')
        .addClass('material-icons')
        .text('sports_bar')
        .appendTo(DrinkerRow);

    // DrankBier
    let manyDrank = $('<span/>')
        .addClass('values')
        .text( data.bierDrank)
        .appendTo(DrinkerRow);
// Payed Icon

    let dollarIcon = $('<span/>')
        .addClass('material-icons')
        .text('monetization_on')
        .appendTo(DrinkerRow);

    // PayedBier
    let manyPayed = $('<span/>')
        .addClass('values')
        .text(data.bierPaid)
        .appendTo(DrinkerRow);


    // Actions
    let drinkerActions = $('<span/>')
        .addClass('todo-actions')
        .appendTo(DrinkerRow)

//remove icon
    let removeAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doDecrement(this)")
        .appendTo(drinkerActions);

    let removeIcon = $('<i/>')
        .addClass('material-icons')
        .text('remove_circle_outline')
        .appendTo(removeAttr);

//add icon
    let addAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doIncrement(this)")
        .appendTo(drinkerActions);

    let addIcon = $('<i/>')
        .addClass('material-icons')
        .text('add_circle_outline')
        .appendTo(addAttr);
//pay icon
    let payAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doPayed(this)")
        .appendTo(drinkerActions);

    let payIcon = $('<i/>')
        .addClass('material-icons')
        .text('monetization_on')
        .appendTo(payAttr);


    //pay one

    let payoneAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doPayOne(this)")
        .appendTo(drinkerActions);

    let payoneIcon = $('<i/>')
        .addClass('material-icons')
        .text('exposure_neg_1')
        .appendTo(payoneAttr);



// Delete icon
    let deleteAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "deleteTodoItem(this)")
        .appendTo(drinkerActions);

    let deleteIcon = $('<i/>')
        .addClass('material-icons')
        .text('clear')
        .appendTo(deleteAttr);


}

/**
 * For animation during delete
 * @param el the li element
 */
function cuteHide(el) {
    el.animate({opacity: '0'}, 300, function () {
        el.animate({height: '0px'}, 300, function () {
            el.remove();
        });
    });
}

