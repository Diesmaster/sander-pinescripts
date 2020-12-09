strategy("ema cross")

sma50 = sma(close, 50)
//ema50 = ema(close, 50)

long = sma50 > close
short = sma50 < close

strategy.entry("long", strategy.long, 1000, when=long)
strategy.entry("short", strategy.short, 1000, when=short)

strategy.close("long", when=short)
strategy.close("short", when=long)
