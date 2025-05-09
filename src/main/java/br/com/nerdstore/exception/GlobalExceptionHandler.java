package br.com.nerdstore.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    public ResponseEntity<br.com.nerdstore.exception.ErrorResponse> handleItemNotFoundException(
            ItemNotFoundException ex, 
            HttpServletRequest request) {
        
        br.com.nerdstore.exception.ErrorResponse error = br.com.nerdstore.exception.ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.NOT_FOUND.value())
                .error("Item não encontrado")
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<br.com.nerdstore.exception.ErrorResponse> handleGenericException(
            Exception ex, 
            HttpServletRequest request) {
        
        br.com.nerdstore.exception.ErrorResponse error = br.com.nerdstore.exception.ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error("Erro interno do servidor")
                .message("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.")
                .path(request.getRequestURI())
                .build();
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}