Add Pay One Beer Button


## Mapping

```bash
@PutMapping("/payone/{id}")
public ResponseEntity<TodoItem> doPayOne(@PathVariable Long id) {
return ResponseEntity.ok(todoItemService.doPayOneForPersItem(id));
}
```


## Ausgangslage
Wer kennt es nicht man hockt gemütlich in einer Bar und trinkt ein paar Bierchen. 
Während die Zeit vergeht kann es schon einmal vorkommen, dass die Schicht der Bedienung 
zu Ende geht und eine Zwischenabrechnung vorgenommen wird. Je später der Abend wird, desto schwieriger wird es da noch die Übersicht zu behalten. Mit dem Biercounter schaffen wir eine einfache Möglichkeit 
mit zu zählen.

## Zweck



## Buttons

# Hochzählen

### Mapping erstellen

```bash
@PutMapping("/increment/{id}")
public ResponseEntity<TodoItem> doIncrement(@PathVariable Long id) {
return ResponseEntity.ok(todoItemService.doIncrementForPersItem(id));
}
```

### Methode erstellen

```bash
public  TodoItem doIncrementForPersItem(Long id) {
TodoItem item = todoItemRepository.findByItemId(id);
if (item != null) {
item.doBierDrunkIncrement();
todoItemRepository.save(item);
return item;
}
return null;
}
```
###Funktion erstellen

```bash
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
```

###Funktions Aufruf und Button erstellen
```bash
    let addAttr = $('<a/>')
        .attr("id", data.itemId) // to know item id!
        .attr("onclick", "doIncrement(this)")
        .appendTo(todoActions);

    let addIcon = $('<i/>')
        .addClass('material-icons')
        .text('add_circle_outline')
        .appendTo(addAttr);
```
## Runterzählen

## Hintergundbild

## Bezahl 1

## Bezahl alle

## Symbole

