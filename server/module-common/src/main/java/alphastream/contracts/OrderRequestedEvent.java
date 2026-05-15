package alphastream.contracts;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderRequestedEvent(
        String orderId,
        String accountId,
        String symbol,
        OrderSide side,
        OrderType orderType,
        BigDecimal price,
        long quantity,
        Instant requestedAt
) {
}
