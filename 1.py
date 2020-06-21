import numpy as np
import matplotlib.pyplot as plt

d = np.load("data/left/1572814991.npy")

for channel in d[175]:
    plt.plot(channel)
plt.show()