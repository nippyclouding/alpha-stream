package alphastream.contracts;

import java.math.BigDecimal;
import java.time.Instant;

public record TradeExecutedEvent(
        String tradeId,
        String buyOrderId,
        String sellOrderId,
        String symbol,
        BigDecimal price,
        long quantity,
        Instant executedAt
) {
}
