package com.ecom.repository.custom;

import com.ecom.domain.User;
import com.ecom.service.dto.AdminUserDTO;
import com.ecom.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {
    Page<User> searchUsers(Pageable pageable, String search);
}
