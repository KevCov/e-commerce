package com.tcc.ecommerce.email;

import com.tcc.ecommerce.kafka.order.Product;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.nio.charset.StandardCharsets.*;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_RELATED;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendPaymentEmail(String emailDestination, String customerName, BigDecimal amount, String orderId) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, MULTIPART_MODE_RELATED, UTF_8.name());

        final String templateName = EmailTemplates.PAYMENT_CONFIRMATION.getTemplate();

        Map<String, Object> variables = new HashMap<>();
        variables.put("customerName", customerName);
        variables.put("amount", amount);
        variables.put("orderId", orderId);

        Context context = new Context();
        context.setVariables(variables);

        messageHelper.setSubject(EmailTemplates.PAYMENT_CONFIRMATION.getSubject());

        try {
            String htmlTemplate = templateEngine.process(templateName, context);
            messageHelper.setText(htmlTemplate, true);

            messageHelper.setTo(emailDestination);
            mailSender.send(mimeMessage);
            log.info(String.format("Email se envio con exito a %s con la plantilla %s", emailDestination, templateName));
        } catch (MessagingException e) {
            log.warn("No se puede enviar el email a {}", emailDestination);
        }
    }

    @Async
    public void sendOrderEmail(String emailDestination, String customerName, BigDecimal amount, String orderId, List<Product> products) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, MULTIPART_MODE_RELATED, UTF_8.name());

        final String templateName = EmailTemplates.ORDER_CONFIRMATION.getTemplate();

        Map<String, Object> variables = new HashMap<>();
        variables.put("customerName", customerName);
        variables.put("totalAmount", amount);
        variables.put("orderId", orderId);
        variables.put("products", products);

        Context context = new Context();
        context.setVariables(variables);

        messageHelper.setSubject(EmailTemplates.ORDER_CONFIRMATION.getSubject());

        try {
            String htmlTemplate = templateEngine.process(templateName, context);
            messageHelper.setText(htmlTemplate, true);

            messageHelper.setTo(emailDestination);
            mailSender.send(mimeMessage);
            log.info(String.format("Email se envio con exito a %s con la plantilla %s", emailDestination, templateName));
        } catch (MessagingException e) {
            log.warn("No se puede enviar el email a {}", emailDestination);
        }
    }
}
