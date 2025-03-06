package org.example.backend.repository;

import org.example.backend.model.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {
    List<FoundItem> findByLocation(String location);
}
