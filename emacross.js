strategy("ema cross")

ema20 = ema(close, 20)
ema50 = ema(close, 50)

long = ema20 > ema50
short = ema20 < ema50

strategy.entry("long", strategy.long, 1000, when=long)
strategy.entry("short", strategy.short, 1000, when=short)

strategy.close("long", when=short)
strategy.close("short", when=long)
