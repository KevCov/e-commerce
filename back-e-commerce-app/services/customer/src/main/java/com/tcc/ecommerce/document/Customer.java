package com.tcc.ecommerce.document;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Document(collection = "customers")
public class Customer {

    @Id
    private ObjectId id;

    @Field(name = "first_name")
    private String firstName;

    @Field(name = "last_name")
    private String lastName;

    @Field(name = "user_login")
    private UserLogin userLogin;

    @Field(name = "phone_number")
    private String phoneNumber;

    @Indexed(name = "idx_dni", unique = true)
    private String dni;
    private boolean status = true;
    private Address address;
}
