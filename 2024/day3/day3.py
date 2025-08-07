import os
import re


def solvePart1(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        corruptedMem = ""
        for line in f:
            corruptedMem += line.strip()
        instructions = re.findall(r"mul\(\d{1,3},\d{1,3}\)", corruptedMem)
        for instruction in instructions:
            values = list(map(int, re.findall(r"\d+", instruction)))
            result += values[0] * values[1]
    return result


def solvePart2(file: str) -> int:
    result = 0
    with open(file, "r") as f:
        corruptedMem = ""
        for line in f:
            corruptedMem += line.strip()
        corruptedMem = re.sub(r"don't\(\)(.*?)do\(\)", "", corruptedMem)
        corruptedMem = re.sub(r"don't\(\).*", "", corruptedMem)
        instructions = re.findall(r"mul\(\d{1,3},\d{1,3}\)", corruptedMem)
        for instruction in instructions:
            values = list(map(int, re.findall(r"\d+", instruction)))
            result += values[0] * values[1]
    return result


if __name__ == "__main__":
    file = os.path.join(os.path.dirname(__file__), "input.txt")
    print(solvePart1(file))
    print(solvePart2(file))
