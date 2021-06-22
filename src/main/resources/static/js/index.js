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
            putEditTodoItem(itemId, taskName, glistId);
        } else {
            postNewTodoItem(taskName, glistId);
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

            createTodoRow(newListItem, data);

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

            createTodoRow(newListItem, data);

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

            createTodoRow(newListItem, data);

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
    $.ajax({
        type: "PUT",
        url: "/api/v1/payed/" + itemId,
        success: function (data) {
            // Create new list item
            let newListItem = $('<li/>')
                .attr("id", "item" + data.itemId);

            if (data.done) {
                // newListItem.addClass('completed')
            }

            createTodoRow(newListItem, data);

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
function putEditTodoItem(itemId, taskName, listId, bierDrank, bierPaid) {
    let todoItem = {
        itemId: itemId,
        taskName: taskName,
        listId: listId,
        bierDrank: bierDrank,
        bierPaid: bierPaid,
    };
    let requestJSON = JSON.stringify(todoItem);
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

            createTodoRow(newListItem, data);

            // Replace the old one by the new one
            let oldListItem = $("#item" + data.itemId);
            oldListItem.replaceWith(newListItem);
        },
        error: function (data) {
        }
    });
}

/**
 * Saves a new todoItem in the backend and creates a list item in the ul list
 * @param taskName the entered task name
 * @param listId   the unique list id with an UUID
 */
function postNewTodoItem(taskName, listId) {
    let newTodoItem = {
        taskName: taskName,
        listId: listId
    };
    let requestJSON = JSON.stringify(newTodoItem);
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

            createTodoRow(li, data);
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
    $.ajax({
        type: "DELETE",
        url: "/api/v1/delete/" + itemId,
        success: function (data) {
            let oldItem = $("#item" + itemId);
            cuteHide(oldItem);
        },
        error: function (data) {
        }
    });
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

    // set the text field
    let taskNameTextField = $("#taskNameTextField");
    taskNameTextField.val(titleSpan.text());
    // set the attribute that we are editing!
    taskNameTextField.attr("isEditing", true);
    taskNameTextField.attr("editingItemId", itemId);
}

/**
 * Creates a row in the todoList
 * The line consists of an id, checkbox, task name, a span with edit icon and delete icon
 * @param parent
 * @param data
 */
function createTodoRow(parent, data) {
    let todoRow = $('<div/>')
        .addClass('todo-row')
        .appendTo(parent)


   /* let checkBoxAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "changeDoneState(this)")
        .addClass('todo-completed')
        .appendTo(todoRow);

    let checkBoxIcon = $('<i/>')
        .addClass('material-icons toggle-completed-checkbox')
        .appendTo(checkBoxAttr);
*/

    // Task Name
    let todoTitle = $('<span/>')
        .addClass('todo-title')
        .text(data.taskName)
        .appendTo(todoRow);

    // DrankBier
    let manyDrank = $('<span/>')
        .addClass('')
        .text("Getrunken: " + data.bierDrank)
        .appendTo(todoRow);

    // PayedBier
    let manyPayed = $('<span/>')
        .addClass('')
        .text("Bezahlt: " + data.bierPaid)
        .appendTo(todoRow);


    // Actions
    let todoActions = $('<span/>')
        .addClass('todo-actions')
        .appendTo(todoRow)

//remove icon
    let removeAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doDecrement(this)")
        .appendTo(todoActions);

    let removeIcon = $('<i/>')
        .addClass('material-icons')
        .text('remove_circle_outline')
        .appendTo(removeAttr);

//add icon
    let addAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doIncrement(this)")
        .appendTo(todoActions);

    let addIcon = $('<i/>')
        .addClass('material-icons')
        .text('add_circle_outline')
        .appendTo(addAttr);
//pay icon
    let payAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doPayed(this)")
        .appendTo(todoActions);

    let payIcon = $('<i/>')
        .addClass('material-icons')
        .text('monetization_on')
        .appendTo(payAttr);



// Delete icon
    let deleteAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "deleteTodoItem(this)")
        .appendTo(todoActions);

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

