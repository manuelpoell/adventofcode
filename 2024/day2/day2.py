import os


def solvePart1(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        for line in f:
            levels = [int(level) for level in line.split()]
            if consistentIncDec(levels) and checkDiffs(levels):
                result += 1
    return result


def consistentIncDec(levels: list[int]) -> bool:
    if levels[0] == levels[1]:
        return False
    for i, _ in enumerate(levels):
        if i == len(levels) - 1:
            return True
        if (
            levels[0] > levels[1]
            and levels[i] <= levels[i + 1]
            or levels[0] < levels[1]
            and levels[i] >= levels[i + 1]
        ):
            return False
    return True


def checkDiffs(levels: list[int]) -> bool:
    for i, _ in enumerate(levels):
        if i == len(levels) - 1:
            return True
        if abs(levels[i] - levels[i + 1]) > 3:
            return False
    return True


def solvePart2(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        for line in f:
            levels = [int(level) for level in line.split()]
            if consistentIncDec(levels) and checkDiffs(levels):
                result += 1
                continue
            for i, _ in enumerate(levels):
                dampened_levels = levels[:i] + levels[i + 1 :]
                if consistentIncDec(dampened_levels) and checkDiffs(dampened_levels):
                    result += 1
                    break
    return result


if __name__ == "__main__":
    file = os.path.join(os.path.dirname(__file__), "input.txt")
    print(solvePart1(file))
    print(solvePart2(file))
