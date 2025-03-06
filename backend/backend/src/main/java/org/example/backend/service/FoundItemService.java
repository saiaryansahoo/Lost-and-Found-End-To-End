package org.example.backend.service;

import org.example.backend.model.FoundItem;
import org.example.backend.repository.FoundItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoundItemService {
    @Autowired
    private FoundItemRepository foundItemRepository;

    public List<FoundItem> getAllFoundItems() {
        return foundItemRepository.findAll();
    }

    public FoundItem addFoundItem(FoundItem foundItem) {
        return foundItemRepository.save(foundItem);
    }
}
