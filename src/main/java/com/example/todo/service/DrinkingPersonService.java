package com.example.todo.service;

import com.example.todo.dto.DrinkingPersonListsDTO;
import com.example.todo.dto.PersItemsDTO;
import com.example.todo.model.PersItem;
import com.example.todo.repository.DrinkingPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DrinkingPersonService {

    @Autowired
    private DrinkingPersonRepository drinkingPersonRepository;

    public PersItem saveDrinkingPerson(PersItem item) {
        return drinkingPersonRepository.save(item);
    }

    public PersItem changeDoneStateForDrinkingPerson(Long id) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.setDone(!item.getDone());
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }

    public Boolean deleteDrinkingPerson(Long id) {
        PersItem item = drinkingPersonRepository.findById(id).orElse(null);
        if (item != null) {
            drinkingPersonRepository.delete(item);
            return true;
        }
        return false;
    }

    public PersItem editDrinkingPerson(PersItem editedItem) {
        PersItem item = drinkingPersonRepository.findById(editedItem.getItemId()).orElse(null);
        if (item != null) {
            item.setTaskName(editedItem.getTaskName());
            return drinkingPersonRepository.save(item);
        }
        //Create new if we dont have.
        return drinkingPersonRepository.save(item);
    }

    public List<PersItem> getAllDrinkingPersonForListId(UUID listId) {
        return drinkingPersonRepository.findByListId(listId);
    }

    /**
     * Return a DTO containing a list of UUID's and the count
     *
     * @return the TodoItemListsDTO
     */
    public DrinkingPersonListsDTO getDrinkingPersonListIDs() {
        List<UUID> listIds = drinkingPersonRepository.findDistinctListId();
        return new DrinkingPersonListsDTO(listIds.size(), listIds);

    }

    /**
     * Return a DTO containing a list of todoLists including a count
     *
     * @return the TodoItemListsDTO
     */
    public List<PersItemsDTO> getDrinkingPersonLists() {
        List<PersItemsDTO> persItemsDTOS = new ArrayList<>();
        List<UUID> listIds = drinkingPersonRepository.findDistinctListId();

        listIds.forEach(listId -> {
            List<PersItem> persItems = this.getAllDrinkingPersonForListId(listId);
            persItemsDTOS.add(new PersItemsDTO(persItems.size(), listId, persItems));
        });
        return persItemsDTOS;
    }


    public PersItem getItem(Long id) {
        return drinkingPersonRepository.findByItemId(id);
    }


    public PersItem doIncrementForPersItem(Long id) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.doBierDrunkIncrement();
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }

    public PersItem doDecrementForPersItem(Long id) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.doBierDrunkDecrement();
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }

    public PersItem doPayedForPersItem(Long id) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.doBierPayed();
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }

    public PersItem doManyPayedForPersItem(Long id, Integer manyBierPay) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.doManyBierPayed(manyBierPay);
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }

    public PersItem doPayOneForPersItem(Long id) {
        PersItem item = drinkingPersonRepository.findByItemId(id);
        if (item != null) {
            item.doOneBierPay();
            drinkingPersonRepository.save(item);
            return item;
        }
        return null;
    }


}


