package com.tcc.ecommerce.document;

import com.tcc.ecommerce.utils.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserLogin {

    @NotEmpty(message = "Email is required")
    @Email(message = "Customer email is not a validate email")
    @Indexed(name = "idx_email", unique = true)
    private String email;

    @NotEmpty(message = "A password is necessary")
    @Size(min = 6, max = 20, message = "The password must be between 6 and 50 characters")
    private String password;

    @NotNull(message = "El Rol no puede ser Nulo")
    private Role role = Role.USER;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
}
