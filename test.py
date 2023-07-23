import sys; print(sys.version) #per vedere che versione di python esegue
x = "abc"
with open('test.txt', 'w') as f:
    f.write(x)