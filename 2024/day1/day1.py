import os


def solvePart1(file: str) -> int:
    result = 0
    left, right = [], []
    with open(file, "r") as f:
        for line in f:
            values = line.split()
            left.append(int(values[0]))
            right.append(int(values[1]))
    for a, b in zip(sorted(left), sorted(right)):
        result += abs(a - b)
    return result


def solvePart2(file: str) -> int:
    result = 0
    left, right = [], []
    with open(file, "r") as f:
        for line in f:
            values = line.split()
            left.append(int(values[0]))
            right.append(int(values[1]))
    for value in left:
        result += value * countAppearance(value, right)
    return result


def countAppearance(val: int, lst: list) -> int:
    sum = 0
    for i in lst:
        if i == val:
            sum += 1
    return sum


if __name__ == "__main__":
    file = os.path.join(os.path.dirname(__file__), "input.txt")
    print(solvePart1(file))
    print(solvePart2(file))
