package dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String fullName;
    private String email;
    private String phone;
    private String password;
}
