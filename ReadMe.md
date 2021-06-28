Add Pay On Beer Button

@PutMapping("/payone/{id}")
public ResponseEntity<TodoItem> doPayOne(@PathVariable Long id) {
return ResponseEntity.ok(todoItemService.doPayOneForPersItem(id));
}