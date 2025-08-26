import os


def solvePart1(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        input = [line.strip() for line in f]
        offsets = [
            ((0, 0), (1, 0), (2, 0), (3, 0)),
            ((0, 0), (0, 1), (0, 2), (0, 3)),
            ((0, 0), (1, 1), (2, 2), (3, 3)),
            ((0, 3), (1, 2), (2, 1), (3, 0)),
        ]
        for y, _ in enumerate(input):
            for x, _ in enumerate(input[0]):
                for offset in offsets:
                    try:
                        word = "".join([input[y + dy][x + dx] for dx, dy in offset])
                        if word in ["XMAS", "SAMX"]:
                            result += 1
                    except:
                        pass
    return result


def solvePart2(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        input = [line.strip() for line in f]
        offset = ((0, 0), (1, 1), (2, 2), (0, 2), (2, 0))
        for y, _ in enumerate(input):
            for x, _ in enumerate(input[0]):
                try:
                    word = "".join([input[y + dy][x + dx] for dx, dy in offset])
                    if word in ["MASMS", "MASSM", "SAMMS", "SAMSM"]:
                        result += 1
                except:
                    pass
    return result


if __name__ == "__main__":
    file = os.path.join(os.path.dirname(__file__), "input.txt")
    print(solvePart1(file))
    print(solvePart2(file))
