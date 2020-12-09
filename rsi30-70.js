//@version=3
strategy(title="Relative Strength Index", shorttitle="RSI")
src = close, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
band1 = hline(70)
band0 = hline(30)
take_Profit=input(15, title="Take Profit", type=integer)
close_Overbought = input(true, "Close at overbought levels", type=bool)
buyCondition = 0
sellCondition = 0
partialSell = 0
counter = 0
if rsi<=30 and strategy.position_size==0
    buyCondition := 1
    strategy.entry("Buy", strategy.long)
profit = ((close-strategy.position_avg_price)/strategy.position_avg_price) * 100
if profit>=take_Profit and strategy.position_size>=1
    quantity = 40
    if close_Overbought == false
        quantity:= 100
    partialSell := 1
    strategy.exit("Buy", profit=20, qty_percent=quantity)
if close_Overbought == true
    if rsi>=70 and strategy.position_size>=1
        sellCondition := 1
        strategy.close("Buy")
plot(sellCondition[1], "SELL", red)
plot(buyCondition, "BUY", green)
plot(partialSell, "SELL", blue)
