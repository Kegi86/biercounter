Add Pay One Beer Button




## Ausgangslage 

Als Ausgangslage haben wir das Projekt Todo-Liste genommen. 
##Zweck
Wer kennt es nicht man hockt gemütlich in einer Bar und trinkt ein paar Bierchen. 
Während die Zeit vergeht kann es schon einmal vorkommen, dass die Schicht der Bedienung 
zu Ende geht und eine Zwischenabrechnung vorgenommen wird. Je später der Abend wird, desto schwieriger wird es da noch die Übersicht zu behalten. Mit dem Biercounter schaffen wir eine einfache Möglichkeit 
mit zu zählen.

## Mappings



```bash
  @GetMapping("/item/{itemId}")
  public PersItem getItem(@PathVariable Long itemId) {
  return drinkingPersonService.getItem(itemId);
  }
```

```bash
    // Get todo list, based on listId
    @GetMapping("/list/{listId}")
    public List<PersItem> getItem(@PathVariable UUID listId) {
        return drinkingPersonService.getAllDrinkingPersonForListId(listId);
    }
```    
```bash
    // Get all todo listIds
    @GetMapping("/listids")
    public DrinkingPersonListsDTO getListIDs() {
        return drinkingPersonService.getDrinkingPersonListIDs();
    }
```    
```bash
    // Get all todo lists
    @GetMapping("/list")
    public List<PersItemsDTO> getAllTodoItems() {
        return drinkingPersonService.getDrinkingPersonLists();
    }
```
```bash
    // New todo item
    @PostMapping(value = "/new")
    public ResponseEntity<PersItem> newTodoItem(@RequestBody PersItem item) {
        return ResponseEntity.ok(drinkingPersonService.saveDrinkingPerson(item));
    }
```    

```bash
    // Edit todo item
    @PutMapping("/edit")
    public ResponseEntity<PersItem> editTodoItem(@RequestBody PersItem item) {
        return ResponseEntity.ok(drinkingPersonService.editDrinkingPerson(item));
    }
    
```
```bash
    // Delete todo item
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteTodoItem(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.deleteDrinkingPerson(id));
    }
```
```bash
    // Change done state
    @PutMapping("/state/{id}")
    public ResponseEntity<PersItem> changeDoneState(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.changeDoneStateForDrinkingPerson(id));
    }
```
```bash
    @PutMapping("/increment/{id}")
    public ResponseEntity<PersItem> doIncrement(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doIncrementForPersItem(id));
    }
```    


```bash
    @PutMapping("/decrement/{id}")
    public ResponseEntity<PersItem> doDecrement(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doDecrementForPersItem(id));
    }
```    

```bash
    @PutMapping("/payed/{id}")
    public ResponseEntity<PersItem> doPayed(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doPayedForPersItem(id));
    }
```
```bash
    @PutMapping("/payone/{id}")
    public ResponseEntity<PersItem> doPayOne(@PathVariable Long id) {
        return ResponseEntity.ok(drinkingPersonService.doPayOneForPersItem(id));
    }
```



# Buttons

# Hochzählen

### Mapping erstellen

Es wurde ein Mapping auf die h2 Datenbank erstellt 

```bash
@PutMapping("/increment/{id}")
public ResponseEntity<PersItem> doIncrement(@PathVariable Long id) {
return ResponseEntity.ok(todoItemService.doIncrementForPersItem(id));
}
```

### Methode erstellen



```bash
public  PersItem doIncrementForPersItem(Long id) {
PersItem item = todoItemRepository.findByItemId(id);
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
### Methode
```bash
public Integer getOneBierPaid () {return bierPaid;}
public void doOneBierPay() {
if (this.bierDrank > 0) {
this.bierPaid = this.bierPaid + 1;
this.bierDrank = this.bierDrank - 1;
  }
}
```
```bash
public void setOneBierPaid (Integer bierPaid) {bierPaid = bierPaid + 1; bierDrank = bierDrank -1;}
```
```bash
@PutMapping("/payone/{id}")
public ResponseEntity<PersItem> doPayOne(@PathVariable Long id) {
return ResponseEntity.ok(drinkingPersonService.doPayOneForPersItem(id));
}
```
## Bier bezahlen


    //Eingabe durch User wieviele Biere bezahlt werden
    public boolean doManyBierPayed(Integer manyBierPay) {
        if (manyBierPay <= this.bierDrank){
            this.bierDrank = this.bierDrank - manyBierPay;
            this.bierPaid = this.bierPaid + manyBierPay;
            this.checkCounter = true;
            return true;
        } else {
            this.checkCounter = false;
            return false;}
    }

******************************************************
Drinking Person
***********************************************

Erstllen der Methode, welche prüft, ob überhaupt genügend Bier zum Zahlen übrig sind, und dann diese entschsprechend von "bierDrank" auf "bierPaid" umbucht.



***********************************************************

    public boolean doManyBierPayed(Integer manyBierPay) {
        if (manyBierPay <= this.bierDrank){
            this.bierDrank = this.bierDrank - manyBierPay;
            this.bierPaid = this.bierPaid + manyBierPay;
            return true;
        } else {
            return false;}
    }



**********************************************
Nach einigen schwierigkeiten mit dem Übergeben der Variablen konnte die neue Funktion so erfolgreich umgesetzt werden.

Nun soll geprüft werden, ob das abbuchen wirklich funktioniert hat, oder ob bei der eingabe einen Fehler (zu viele Biere) abgebucht wurden und dadurch die funktion nicht ausgefürrt wurde.
Dies soll ans Frontend übermittelt werden und dem User eine Bestätigung, respektiver Fehlermeldung anzeigen.


Dafür wurde folgender TodoItemService erstellt: (nicht implementiert)
***********************************************************
    public boolean doCheckBierToPay (Long id, Integer manyBierPay) {
        TodoItem item = todoItemRepository.findByItemId(id);
        if ( item.doManyBierPayed(manyBierPay)) {
            return true;
        } else {
        return false;}
    }

************************************************************

## Symbole

