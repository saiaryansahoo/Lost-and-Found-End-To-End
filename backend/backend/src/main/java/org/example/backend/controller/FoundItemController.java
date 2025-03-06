package org.example.backend.controller;

import org.example.backend.model.FoundItem;
import org.example.backend.service.FoundItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/found")
public class FoundItemController {
    @Autowired
    private FoundItemService foundItemService;

    @GetMapping
    public List<FoundItem> getAllFoundItems() {
        return foundItemService.getAllFoundItems();
    }

    @PostMapping
    public FoundItem addFoundItem(@RequestBody FoundItem foundItem) {
        return foundItemService.addFoundItem(foundItem);
    }
}
